import React, { useEffect, useState } from 'react';
import instance from '../constants/axios';

function Addprofile() {
    const [image, setImage] = useState(null);
    const [userDetails, setUserdetails] = useState(null);
    const [refresh, setrefresh] = useState(true);
    let user = localStorage.getItem('user');
    user = JSON.parse(user);

    const handlesubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('Image', image);
        formData.append('userId', user._id);
        instance
            .post('/upload', formData, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                setrefresh(!refresh);
            })
            .catch((err) => {
                alert(err);
            });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        instance
            .get(`/userDetails/${user._id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((result) => {
                setUserdetails(result.data);
            })
            .catch(({ response }) => {
                alert(response.data.message);
            });
    }, [refresh]);

    return (
        <>
            <div className="maindiv">
                <div style={{ marginLeft: '20px' }}>
                    <h1>profile Details</h1>
                    <div>
                        <div>
                            <img
                                style={{ height: 150, width: 150 }}
                                className="imageSize"
                                src={
                                    userDetails?.image
                                        ? userDetails.image
                                        : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                                }
                                alt="propic"
                            />
                        </div>
                        <div style={{ fontFamily: 'sans-serif' }}>
                            <p>
                                Username: <span style={{ color: 'red' }}>{userDetails?.name}</span>
                            </p>
                            <p>
                                Email: <span style={{ color: 'green' }}>{userDetails?.email}</span>
                            </p>
                            <p>Change your profile pic</p>
                        </div>
                    </div>
                    <div className="Formclass">
                        <form onSubmit={handlesubmit}>
                            <input
                                className="bg-dark bg-gradient"
                                type="file"
                                name="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            <button className="btn btn-dark bg-gradient m-2" type="submit">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Addprofile;
