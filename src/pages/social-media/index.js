// Import necessary dependencies
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { makeStyles } from '@mui/styles';

// Add styles for the component
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    margin: 'auto',
    marginBottom: theme.spacing(3),
  },
  media: {
    height: 140,
  },
  postImage: {
    width: '100%',
    height: 'auto',
  },
}));

// Define the users with additional data
const users = [
  {
    id: 1,
    name: 'John Doe',
    posts: [
      { id: 1, content: 'This is my first post! 🚀' },
      {
        id: 2,
        content: 'Just another day in the coding world. 💻',
        image: 'https://placekitten.com/200/300',
      },
    ],
    messages: [
      { id: 1, content: 'Hi there!', sender: 'John Doe' },
      { id: 2, content: 'Hello! How are you?', sender: 'Jane Smith' },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    posts: [
      { id: 3, content: 'Hello, world! 👋' },
      {
        id: 4,
        content: 'Excited to join this social media platform! 🎉',
        image: 'https://placekitten.com/200/300',
      },
    ],
    messages: [
      { id: 3, content: 'Hello! How are you?', sender: 'Jane Smith' },
      { id: 4, content: "I'm doing great, thanks!", sender: 'John Doe' },
    ],
  },
  
  // Add new users
  {
    id: 3,
    name: 'Alice Johnson',
    posts: [
      { id: 5, content: 'Enjoying a sunny day! ☀️' },
      {
        id: 6,
        content: 'Coding is fun! 😄',
        image: 'https://placekitten.com/200/300',
      },
    ],
    messages: [
      { id: 5, content: 'Hi, everyone!', sender: 'Alice Johnson' },
    ],
  },
  {
    id: 4,
    name: 'Bob Williams',
    posts: [
      { id: 7, content: 'Exploring new technologies!' },
      {
        id: 8,
        content: 'Learning ReactJS. 🚀',
        image: 'https://placekitten.com/200/300',
      },
    ],
    messages: [
      { id: 6, content: 'Hello world!', sender: 'Bob Williams' },
    ],
  },
];

const SocialMediaTemplate = () => {
  const [newPost, setNewPost] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const classes = useStyles();

  const handlePostSubmit = () => {
    // Add logic to handle post submission
    const newPostData = {
      id: users[0].posts.length + 1,
      content: newPost,
      image: newImage,
    };

    console.log('New Post:', newPostData);

    // You may want to update the posts state and clear the input fields
    setNewPost('');
    setNewImage('');
  };

  const handleSendMessage = (userId) => {
    // Add logic to handle message submission
    const newMessageData = {
      id: users[0].messages.length + 1,
      content: newMessage,
      sender: users[0].name, // Assuming the current user is sending the message
    };

    console.log('New Message:', newMessageData);

    // You may want to update the messages state and clear the input field
    setNewMessage('');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="What's on your mind?"
          variant="outlined"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Image URL (optional)"
          variant="outlined"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handlePostSubmit}>
          Post
        </Button>
      </Grid>
      <Grid item xs={12}>
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <Card className={classes.card}>
                <CardContent>
                  <Avatar>{user.name[0]}</Avatar>
                  <Typography variant="subtitle1" component="div" sx={{ marginLeft: 1 }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body1">Posts:</Typography>
                  <List>
                    {user.posts.map((post) => (
                      <ListItem key={post.id}>
                        <Typography variant="body2">{post.content}</Typography>
                        {post.image && (
                          <CardMedia
                            className={classes.media}
                            component="img"
                            alt="Post Image"
                            image={post.image}
                          />
                        )}
                      </ListItem>
                    ))}
                  </List>
                  <Typography variant="body1">Messages:</Typography>
                  <List>
                    {user.messages.map((message) => (
                      <ListItem key={message.id}>
                        <Typography variant="body2">{`${message.sender}: ${message.content}`}</Typography>
                      </ListItem>
                    ))}
                  </List>
                  <TextField
                    fullWidth
                    label="Send a message"
                    variant="outlined"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSendMessage(user.id)}
                  >
                    Send
                  </Button>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default SocialMediaTemplate;
