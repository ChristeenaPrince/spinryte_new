// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const companyData = [
  {
    id: 1,
    name: 'Company A',
    description: 'Description of Company A.',
    email: 'companyA@example.com',
    imgUrl:'https://images.pexels.com/photos/188035/pexels-photo-188035.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  },
  {
    id: 2,
    name: 'Company B',
    description: 'Description of Company B.',
    email: 'companyB@example.com',
    imgUrl:'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  },
  {
    id: 3,
    name: 'Company C',
    description: 'Description of Company C.',
    email: 'companyA@example.com',
    imgUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg/640px-M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg'
  },
  {
    id: 4,
    name: 'Company D',
    description: 'Description of Company D.',
    email: 'companyB@example.com',
    imgUrl:'https://media.istockphoto.com/id/184962061/photo/business-towers.jpg?s=612x612&w=0&k=20&c=gLQLQ9lnfW6OnJVe39r516vbZYupOoEPl7P_22Un6EM='
  },
  {
    id: 5,
    name: 'Company E',
    description: 'Description of Company E.',
    email: 'companyA@example.com',
    imgUrl:'https://i0.wp.com/stanzaliving.wpcomstaging.com/wp-content/uploads/2022/04/5ba1a-top-companies-in-india.jpg?fit=1000%2C665&ssl=1'
  },
  {
    id: 6,
    name: 'Company F',
    description: 'Description of Company F.',
    email: 'companyB@example.com',
    imgUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmjQYpAXbffzCCAcqewK9u1rA7BIDQM3DYMg&usqp=CAU'
  },
  {
    id: 7,
    name: 'Company G',
    description: 'Description of Company G.',
    email: 'companyA@example.com',
    imgUrl:'https://www.skytechindia.com/images/company.jpg'
  },
  {
    id: 8,
    name: 'Company H',
    description: 'Description of Company H.',
    email: 'companyB@example.com',
    imgUrl:'https://img.freepik.com/premium-photo/contemporary-architecture-office_1417-4151.jpg'
  },

  {
    id: 9,
    name: 'Company I',
    description: 'Description of Company I.',
    email: 'companyA@example.com',
    imgUrl:'https://www.thestreet.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTY3NTM5MzU5MDg3MjczODcw/business-structure-which-type-is-best-for-your-business.png'
  },
  {
    id: 10,
    name: 'Company J',
    description: 'Description of Company J.',
    email: 'companyB@example.com',
    imgUrl:'https://img.freepik.com/free-photo/landmarks-modern-city_1359-338.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703116800&semt=ais'
  },
  
  
];

const Email = () => {
  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {companyData.map((company) => (
        <Grid item key={company.id}>
          <Tooltip arrow title={company.name} placement="top">
            <Card style={{ maxWidth: 200, textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px' }}>
              <img
                src={company.imgUrl}
                alt={company.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                <Typography variant="h5" style={{ marginBottom: '10px', color: '#007bff' }}>
                  {company.name}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: '20px',}}>
                  {company.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEmailClick(company.email)}
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};

export default Email;
