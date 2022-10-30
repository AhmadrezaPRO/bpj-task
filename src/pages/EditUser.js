import React, {useCallback, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {
    Button,
    Card,
    Container,
    Grid,
    TextField,
} from "@mui/material";
import {useFormik} from "formik";

const EditUser = () => {
    const navigate = useNavigate()
    const params = useParams();
    let initialValues = {
        firstName: "",
        lastName: "",
        city: "",
        address: "",
    };
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            axios
                .put(
                    "https://63581241c27556d289368088.mockapi.io/api/v1/users/" +
                    params.id,
                    {
                        ...values,
                    }
                )
                .then((res) => {
                    getData();
                    navigate('/')
                });
        },
    });

    //

    const getData = useCallback(() => {
        axios
            .get(
                `https://63581241c27556d289368088.mockapi.io/api/v1/users/${params.id}`
            )
            .then((res) => {
                formik.setFieldValue("firstName", res.data.firstName);
                formik.setFieldValue("lastName", res.data.lastName);
                formik.setFieldValue("city", res.data.city);
                formik.setFieldValue("address", res.data.address);
            });
        // eslint-disable-next-line
    },[params.id])

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <Container
            maxWidth="lg"
            style={{marginTop: 10}}>
            <Card
                style={{
                    padding: "15px",
                    margin: "20px 5px"
                }}>
                <h4>Edit User</h4>
                <Grid
                    container
                    justifyContent="center"
                    padding={3}
                    style={{margin: "50px 20px"}}
                >
                    <form onSubmit={formik.handleSubmit}>
                        <Grid
                            item
                            xs={12}
                            md={12}
                            mt={2}>
                            <TextField
                                id="firstName"
                                name="firstName"
                                label="FirstName"
                                variant="outlined"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                style={{margin: "5px"}}
                            />
                            <TextField
                                id="lastName"
                                name="lastName"
                                label="LastName"
                                variant="outlined"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                style={{margin: "5px"}}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={12}
                            mt={2}>
                            <TextField
                                id="city"
                                name="city"
                                label="City"
                                variant="outlined"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                style={{margin: "5px"}}
                            />
                            <TextField
                                id="address"
                                name="address"
                                label="Address"
                                variant="outlined"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                style={{margin: "5px"}}
                            />
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                                type="submit"
                                style={{maxWidth: "82%"}}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </Card>
        </Container>
    );
};

export default EditUser;
