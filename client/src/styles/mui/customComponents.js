import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

export const CustomCard = (props) => (
    <Card sx={{ maxWidth: 350, width: 350, height: 320, borderRadius: "24px", p: 2 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="150"
        sx={{ objectFit: "contain", p: 2 }}
        image={props.Image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.Name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {props.Description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
)