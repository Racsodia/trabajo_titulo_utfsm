import React from "react";
import { MDBBreadcrumb, MDBBreadcrumbItem, Container } from "mdbreact";

const BreadcrumbPage = props => {
  return (
    <Container className="p-0">
      <MDBBreadcrumb className="p-0">
        <MDBBreadcrumbItem href="/">Home</MDBBreadcrumbItem>
        <MDBBreadcrumbItem href ="/desafios"active>Desafíos</MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>Cáncer</MDBBreadcrumbItem>
      </MDBBreadcrumb>
    </Container>
  );
};

export default BreadcrumbPage;
