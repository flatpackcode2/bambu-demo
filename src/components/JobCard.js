import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const JobCard = (el) => {
  return (
    <div>
      <Card>
        <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
        <CardBody>
          <CardTitle>{el.title}</CardTitle>
          <CardSubtitle>{el.title}</CardSubtitle>
          <CardText>{el.description}</CardText>
          <Button href="el.apply_url" target="_blank">Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default JobCard;