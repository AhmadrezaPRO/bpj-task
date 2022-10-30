import React, {useState, useEffect, useCallback} from "react";
import {
    Button,
    Card,
    Container,
    Grid,
    TextField,
} from "@mui/material";
import {useFormik} from "formik";
import axios from "axios";
import MyTable from "components/MyTable";

const Home = () => {
    const [ascending, setAscending] = useState(false)

    const getData = useCallback((ascending) => {
        axios
            .get("https://63581241c27556d289368088.mockapi.io/api/v1/users")
            .then((res) => {
                if (ascending) setTableContent(res.data)
                else setTableContent(res.data.reverse())
            });
    }, [])

    const [tableContent, setTableContent] = useState([]);
    const initialValues = {
        firstName: "",
        lastName: "",
        city: "",
        address: "",
    };
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            axios
                .post("https://63581241c27556d289368088.mockapi.io/api/v1/users", {
                    ...values,
                })
                .then((res) => {
                    console.log(res);
                    getData(ascending);
                });
            console.log(values);
        },
    });


    useEffect(() => {
        getData(ascending);
    }, [ascending, getData]);

    return (
        <Container maxWidth="lg">
            <Card
                style={{
                    padding: "15px",
                    margin: "20px 5px"
                }}>
                <h4>Create New User</h4>
                <Grid
                    container
                    justifyContent="center"
                    padding={3}
                    style={{margin: "50px 0px"}}
                    sx={{mx: "10px"}}
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
                <div style={{display: "flex"}}>
                    <Button
                        onClick={() => setAscending(prevState => !prevState)}
                        color="primary"
                        variant="outlined"
                        fullWidth
                        type="submit"
                        style={{
                            width: "150px",
                            marginBottom: "10px",
                            marginRight: "auto"
                        }}
                    >
                        {ascending ? "Ascending ↑" : "Descending ↓"}
                    </Button>
                </div>
                <MyTable
                    tableContent={tableContent}
                    rowContent = {['id', 'firstName', 'lastName', 'city', 'address']}
                    editLink={'/editUser/'}
                    cols={[
                        {
                            id: 1,
                            label: "Row Number"
                        },
                        {
                            id: 2,
                            label: "First Name"
                        },
                        {
                            id: 3,
                            label: "Last Name"
                        },
                        {
                            id: 4,
                            label: "City"
                        },
                        {
                            id: 5,
                            label: "Address"
                        },
                        {
                            id: 6,
                            label: '\xa0'
                        },
                    ]}/>
            </Card>
        </Container>
    );
};

export default Home;
