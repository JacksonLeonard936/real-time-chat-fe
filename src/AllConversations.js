import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
    Grid,
    Paper,
    Button
  } from '@mui/material';

export const AllConversations = () =>{
    const [conversations, setConversations] = useState([]);
    const navigate = useNavigate()
    function duplicateConversations(conversations) {
        const seen_conversations = {}
        const returned_conversations = []
        conversations.forEach((conversation) => {
            const sender = conversation.sender_id;
            const receiver = conversation.receiver_id;
            if (seen_conversations[(sender, receiver)] == 1 || seen_conversations[(receiver, sender)] == 1) {
                return
            } else {
                returned_conversations.push(conversation);
                seen_conversations[(sender, receiver)] = 1
            }
        })
        return returned_conversations;
    }
    function fetchConversations() {
        const id = localStorage.getItem("UserID")
        axios.get(`http://localhost:7070/api/messages/${id}`).then(response => setConversations(duplicateConversations(response.data)));
    }
    function onLogout() {
        localStorage.removeItem("AuthToken")
        localStorage.removeItem("UserID")
        navigate("/login")
    }
    useEffect(() => {
        fetchConversations()
    }, [])
    return(<>
        <TableContainer component={Paper}>
        <Grid item xs={12}>
            <Button fullWidth onClick={() => onLogout()}> Logout </Button>
          </Grid>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Sender ID</TableCell>
                <TableCell align="right">Receiver ID</TableCell>
                <TableCell align="right">Last Message</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
        {conversations.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => navigate(`/conversation?firstUserId=${row.sender_id}&secondUserId=${row.receiver_id}`)}
                >
                <TableCell align="right">{row.sender_id}</TableCell>
                <TableCell align="right">{row.receiver_id}</TableCell>
                <TableCell align="right">{row.text}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>)
}

