import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/home.css';
import Loading from "../components/Loading";

let data;

const Home = () => {

    const [ webData, setWebData ] = useState(); 

    const getData = async () => {
        const result = await axios.get("https://ezetap-docs-project-api.herokuapp.com/dashboard")
        .catch((error) => {
            console.log(error.mapiDetailsessage);
        });
        data = result.data.data;
        if(data !== undefined)
        {
            setWebData(data);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if(webData !== undefined){
        console.log(webData.footer);
    }

    return (
        <div className = 'mainDiv'>
            {
                webData
                ?
                <div className = 'dashboard'>
                    <div className = 'sectionHeader'>
                        <div className = 'logoDiv'>
                            <img src = { webData.header.headerImg } alt = { webData.header.headerImgAlt } />
                        </div>
                        
                        <hr className = 'rule'></hr>

                        <div className = 'headertitle'>
                            <h1>{ webData.header.headerTitle }</h1>
                        </div>

                        <div className = 'headerText'>
                            <p>
                                { webData.header.headerText }
                            </p>
                        </div>
                    </div>

                    <div className='dataGrid'>
                        <table className = 'tasksGrid'>
                            <thead className = 'tableHeader'>
                                <tr>
                                    {
                                        webData.tableGrid.tableHead.map(thead => (
                                            <th>
                                                <div>
                                                    <div>
                                                        {thead.theader}
                                                    </div>
                                                </div>
                                            </th>
                                        ))
                                    }
                                </tr>
                            </thead>

                            <tbody className = 'tableBody'>
                                {
                                    webData.tableGrid.tableBody.map(tabbodyrow => (
                                        <tr>
                                            {
                                                tabbodyrow.map(tbr => (
                                                    <td>
                                                        { tbr.tbody }
                                                    </td>
                                                ))
                                            }
                                            <td>
                                                <img src = { webData.tableGrid.checkImg } style={{ height: "25px", width: "25px", padding: "0px 0px 0px 20px"}} alt = { webData.tableGrid.checkImgAlt } />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className = 'sectionFooter'>
                        <div className = 'links'>
                            <a>
                                <ul>
                                    {
                                        webData.footer.links.map(listitems => 
                                        (
                                            <li>{ listitems.li }</li>
                                        ))
                                    }
                                </ul>
                            </a>
                        </div>

                        <div className = 'status'>
                            <ul>
                                {
                                    webData.footer.status.map(statusitems => 
                                        (                                            
                                            <li>
                                                <img src = { statusitems.liImg } alt = { statusitems.liImgAlt } style={{ width: "18px", height: "18px" }}/>
                                                <span>{ statusitems.liSpan }</span>
                                            </li>
                                        ))
                                }
                            </ul>
                        </div>
                        <hr className = 'rule'></hr>

                        <div className = 'copyright'>
                            <p>&copy;{ webData.footer.copyrightText }</p>
                        </div>
                    </div>
                </div>
                :
                <Loading />
            }
        </div>
    );
};

export default Home;