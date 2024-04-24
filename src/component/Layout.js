import { supabase } from "../supabaseClient";
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Height } from "@mui/icons-material";
const style = {
    // default style
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StoreDetail = (store) => {
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const handleOpen = () => {
        getComments();
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    console.log("store", store);

    // get comment from supabase
    const getComments = async () => {
        const {data, error} = await supabase
        .from('comments')
        .select('comment')
        .eq('restaurant_id', store.store.id);
        if (error) {
            console.log("error", error);
            throw error;
        } else {
            setComments(data);
            console.log("comments", data);
        }
    };

    return (
        <div>
            {
                store ? <Button onClick={handleOpen}>Open {store.store.name}</Button> : <></>
            }
            
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Store name: {store.store.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Store location: {store.store.location}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Comments: {comments.map(comment => ( <p>{comment.comment}</p> ))} {/* the p can be changed to comments*/}
                    </Typography>
                    <Button onClick={handleClose}>Close {store.name}</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default StoreDetail;
