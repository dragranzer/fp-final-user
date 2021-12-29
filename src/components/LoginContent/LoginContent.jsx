import React from 'react'
import { Col, Container, Row, Form, InputGroup, Button, Image } from 'react-bootstrap'
import style from './LoginContent.module.css'
import { Link } from 'react-router-dom'
import { useState } from "react";
import gambar from "../../img/google.png"
import gambar2 from "../../img/facebook.png"
import gambar3 from "../../img/login.png"
import Footer from '../Footer/Footer';

const dataLogin = {
    username: "",
    password: "",
};

export default function LoginContent() {
    const [validated, setValidated] = useState(false);


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    }
    return (
        <div>
            <Container className={style.space}>
                <Row>
                    <Col sm={7}>
                        <Image src={gambar3} width="90%" />
                    </Col>
                    <Col sm={1}>
                    </Col>
                    <Col sm={4}>
                        <h3 className={style.text1}>Logo</h3>
                        <h4 className={style.text2}>Masuk</h4>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group controlId="validationCustom01">
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Username"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Username is Required
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group controlId="validationCustom02">
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Password is Required
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row >
                            <div className="d-grid gap-2" >
                                <Button className={style.ButDaf} size="lg" type="submit">
                                    <Link to={`/Login/HomeLogin`} > MASUK </Link>
                                </Button>
                            </div>
                        </Form>
                        <div className={style.space2}><h6>Lupa Kata Sandi? <Link to={`/CekLogin`} className={style.text3}>Klik Disini</Link></h6></div>
                        <div className={style.mid}><h6 className={style.space3}>----------------Atau Masuk Dengan----------------</h6></div>
                        <div className="d-grid gap-2">
                            <Button className={style.butGo} size="lg">
                                <Image src={gambar} width="8%" className={style.google} /> Google
                            </Button>
                        </div> <br />

                        <div className="d-grid gap-2">
                            <Button className={style.butGo} size="lg">
                                <Image src={gambar2} width="4%" className={style.google} /> Facebook
                            </Button>
                        </div>
                        <div className={style.space2}><h6>Tidak Punya Akun? <Link to={`/Register`} className={style.text3}>Daftar Disini</Link></h6></div>
                        <br />
                        <div ><Footer /></div>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}
