// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

const FormLayoutsBasic = () => {
  const [checkedItems, setCheckedItems] = useState({
    userManagement: false,
    listManagement: false,
    imageApproval: false,
    packages: false,
    feedbackManagement: false,
    pushNotification: false,
    advertisingManagement: false,
    youtubeVideoLinks: false,
    digitalMagazine: false,
  });

  const handleCheckboxChange = (name) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: !prevCheckedItems[name],
    }));
  };

  return (
    <Card>
      <CardHeader title='Create Group' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField fullWidth label='Group Name' placeholder='' />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='Desc'
                label='Description'
                placeholder=''
                helperText=''
              />
            </Grid>
            <Grid item xs={12}>
            <Typography variant='h5' sx={{ marginBottom: 2 }}>
                Permission
              </Typography>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {Object.entries(checkedItems).map(([key, value]) => (
                  <li key={key} style={{ marginBottom: '10px' }}>
                    <FormControlLabel
                      control={<Checkbox checked={value} onChange={() => handleCheckboxChange(key)} />}
                      label={key.replace(/([A-Z])/g, ' $1').trim()}  // Convert camelCase to space-separated text
                    />
                  </li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Button type='submit' variant='contained' size='large'>
                  Create Group
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormLayoutsBasic;
