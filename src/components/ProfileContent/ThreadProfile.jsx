import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import style from "./ThreadProfile.module.css"
import * as FiIcons from 'react-icons/fi';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import gambar from "../../img/Spiderman.png"
import gambar2 from "../../img/love.png"

import { Link, useParams, useNavigate } from 'react-router-dom';
import { ThreadLoginData } from '../Thread/ThreadLoginData';
import GetHomePageThread from '../../Hooks/GET/GetMengikutiThread';
import GetProfileData from '../../Hooks/GET/GetProfileData';
import GetThreadByID from '../../Hooks/GET/GetThreadByID';
// import GetAllThreadBYUser from '../../Hooks/GET/GetAllThreadBYUser';
import Axios from 'axios';
import swal from 'sweetalert';

export default function ThreadProfile(props) {
    const stateProfileData = GetProfileData(props)

    const { id } = useParams();
    const [state, setState] = useState(null)
    // console.log("ini state", state ? state : null);
    const URL = `http://localhost:1234/user/` + id + `/threads`
    let history = useNavigate();

    useEffect(() => {
        const getData = async () => {
            Axios.get(URL)
                .then(res => {
                    console.log("ini res", res);
                    setState(res)

                    // setProfile(res.data.data);
                    if (res.data.token) {
                        console.log("berhasil")

                    }
                }).catch(error => {
                    // this.setError()
                    console.log(error)
                    if (error.response) {
                        console.log("--------------------------------------------------")
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        if (error.response.status === 401) {
                            history("/Login");
                            swal({
                                title: "Error",
                                text: "Mohon Login Terlebih Dahulu",
                                icon: "error",
                            });
                        }
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log("*************************")

                        // The request was made but no response was received
                        // error.request is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        console.log("++++++++++++++++++++++++")
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                })
        }
        getData();
        // console.log(profile)

    }, []);

    return (
        <>
            <div className={style.space}>
                {
                    state?.data.data.map((item, index) => {
                        // console.log("ini ThreadeState", threadState);
                        return (
                            <div key={index}>
                                <Container className={style.space7}>
                                    <Row>
                                        <Col sm={6} className={style.posisi}>
                                            <FiIcons.FiUser size={25} />
                                            <h6 className={style.space2}>

                                                {
                                                    stateProfileData ? stateProfileData.data.data.Username : null
                                                }

                                            </h6>
                                        </Col>
                                        <Col sm={3}></Col>
                                        <Col sm={3}></Col>
                                    </Row>
                                    <Row className={style.box}>
                                        <div >
                                            <Col className={style.mid}>
                                                {item ? item.Title : null}
                                            </Col>
                                        </div>
                                        <div >
                                            <Col className={style.mid}>
                                                <Image src={item ? item.ImgUrl : null} width="80%" />
                                            </Col>
                                        </div>
                                        <div>
                                            <Row>
                                                <Col sm={1}></Col>
                                                <Col sm={10}>
                                                    <h6 className={style.space4}>
                                                        {item ? item.Description : null}
                                                    </h6>
                                                </Col>
                                                <Col sm={1}></Col>
                                            </Row>
                                        </div>
                                    </Row>
                                    <Row >
                                        <Col className={style.bag}>
                                            <div className={style.det}>

                                                <Image src={gambar2} width="20px" height="20px" />
                                                <h6 className={style.space8}>
                                                    {item ? item.Like : null}
                                                </h6>
                                                <Link to={`/Login/HomeLogin/${item.ID}/Comment`} className={style.space9}>
                                                    <BiIcons.BiCommentDetail size={20} className={style.space10} />
                                                </Link>
                                                <h6 className={style.space8}>
                                                    {item ? item.JumlahComment : null}
                                                </h6>
                                                <FiIcons.FiShare2 className={style.space11} />

                                            </div>
                                            <Link to={`/Login/HomeLogin/${item.Kategori}`}
                                                className={style.text}><h6 >{item.Kategori}</h6></Link>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        )
                    })
                }

            </div>


        </>
    )
}

