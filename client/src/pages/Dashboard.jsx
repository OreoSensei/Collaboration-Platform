import React, {useEffect} from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Grid2,
    Card,
    CardContent,
    CardActions,
    Container,
    CircularProgress,
    Alert,
} from '@mui/material';
import {Add} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDocuments, createDocument } from '../store/actions/documentActions';
import { logout } from "../store/actions/authActions";

function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const documents = useSelector((state) => state.documents.documents);
    const loading = useSelector((state) => state.documents.loading);
    const error = useSelector((state) => state.documents.error);

    useEffect(() => {
        dispatch(getDocuments());
    }, [dispatch]);

    const handleCreateNew = async () => {
        try {
            const res = await dispatch(createDocument('Untitled Document'));
            navigate(`/document/${res.payload.id}`);
        } catch (err) {
            //Handle error
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    if (loading) {
        return (
            <Container sx={{ mt: 4, textAlign: 'center'}}>
                <CircularProgress />
            </Container>
        );
    }

    if(error) {
        return (
            <Container sx={{mt: 4}}>
                <Alert severity="error">{error.msg || 'Error fetching documents'}</Alert>
            </Container>
        );
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{flexGrow: 1 }}>
                        Collaboration Platform
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/profile')}>
                        Profile
                    </Button>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Container sx={{mt: 4}}>
                <Grid2 container spacing={2} justifyContent="space-between" alignItems="center">
                    <Grid2 item>
                        <Typography variant="h5">Your Documents</Typography>
                    </Grid2>
                    <Grid2 item>
                        <Button variant="contained" startIcon={<Add />} onClick={handleCreateNew}>
                            New Document
                        </Button>
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={2} sx={{mt: 2}}>
                    {documents.map((doc) => (
                        <Grid2 item xs = {12} sm = {6} md = {4} key={doc.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{doc.title}</Typography>
                                    <Typography color="textSecondary"> Last edited: {doc.lastEdited}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => navigate(`/document/${doc.id}`)}>
                                        Open
                                    </Button>
                                    {/* Add any additional buttons if needed */}
                                </CardActions>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            </Container>
        </>
    );
}

export default Dashboard;