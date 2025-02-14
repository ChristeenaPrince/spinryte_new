// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

/**
 ** Icons Imports:
 * ! You need to import all the icons which come from the API or from your server
 * ! and then add these icons in 'icons' variable.
 * ! If you need all the icons from the library, use "import * as Icon from 'mdi-material-ui'"
 */

// Assuming you have an 'icons' variable with your imported icons
// import * as icons from 'mdi-material-ui'

const DashBoard = () => {
  // Example icons
  const icons = {
    icon1: 'mdi-material-ui/Account',
    icon2: 'mdi-material-ui/AccountGroup',
    // Add more icons as needed
  };

  return (
    <Grid container spacing={2}>
      {Object.entries(icons).map(([key, iconTag]) => (
        <Grid item key={key}>
          <Tooltip arrow title={key} placement='top'>
            <Card>
              <CardContent sx={{ display: 'flex' }}>
                {/* Use the imported icon dynamically */}
                {/* <Icon.{iconTag} /> */}
                {/* Example usage */}
                {/* <Icon.Account /> */}
              </CardContent>
            </Card>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashBoard;
