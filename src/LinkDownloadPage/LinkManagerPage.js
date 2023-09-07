import axios from 'axios';
import './linkmanager.scss'
import { useEffect, useState } from 'react';

function LinkDownloadManagerPage() {

    const [links, setLinks] = useState([])
    const [id , setId] = useState('')
    useEffect(() => {
        axios.get('https://ic-gaming-node-js.vercel.app/links/api')
            .then(res => setLinks(res.data))
    }, [])

    const handleInsertLinks = () => {
        const input = document.getElementsByClassName('links-txt')
        const links = [...input].map(item => item.value)
        const linkDownload = links.filter(item => item.trim() !== '');
        const title = document.querySelector('.txt-title').value
        const logo = document.querySelector('.txt-logo').value
        const password = document.querySelector('.txt-password').value
        axios.post('https://ic-gaming-node-js.vercel.app/links/insert', {title : title, logo : logo, links : linkDownload, password : password})
            .then(res => {
                if(res.data.status == 200) {
                    window.location.reload()
                }
            })
    }

    const handleDelete = (_id) => {
        axios.post('https://ic-gaming-node-js.vercel.app/links/delete', {id : _id})
            .then(res => {
                if(res.data.status == 200) {
                    window.location.reload()
                }
            })
    }

    const handleShow = (_id) => {
        const input = document.getElementsByClassName('links-txt')
        axios.get('https://ic-gaming-node-js.vercel.app/links/getById?id='+ _id)
            .then(res => {
                document.querySelector('.txt-title').value = res.data.title
                document.querySelector('.txt-logo').value = res.data.logo
                document.querySelector('.txt-password').value = res.data.password
                document.querySelector('.txt-url').value = res.data.URL
                for (let i = 0 ; i < input.length ; i++) {
                    input[i].value = ''
                }
                res.data.links.forEach((link, index) => {
                    input[index].value = link
                })
                setId(_id)
            })
    }

    const handleUpdateLinks = () => {
        const title = document.querySelector('.txt-title').value
        const logo = document.querySelector('.txt-logo').value
        const password = document.querySelector('.txt-password').value
        const input = document.getElementsByClassName('links-txt')
        const links = [...input].map(item => item.value)
        const linkDownload = links.filter(item => item.trim() !== '');
        if (id != '') {
            axios.post('https://ic-gaming-node-js.vercel.app/links/update', {id : id, title : title, logo : logo, links :  linkDownload, password : password})
                .then(res => {
                    if(res.data.status == 200) {
                        window.location.reload()
                    }
                })
        }
    }

    return (
        <div id='links-manager-page' className='col-lg-12'>
            <div className='col-lg-6 form-input'>
                <div class="mt-2"></div>
                <div class="form-group">
                    <label className='col-lg-12' for="customInput">Title</label>
                    <div class="mt-1"></div>
                    <input type="text" name="titleVideo" class="form-control txt-title" placeholder="Enter text"/>
                </div>
                
                <div class="mt-2"></div>
                <div class="form-group">
                    <label className='col-lg-12' for="customInput">Logo</label>
                    <div class="mt-1"></div>
                    <input type="text" name="titleVideo" class="form-control txt-logo" placeholder="Enter text"/>
                </div>

                <div class="mt-2"></div>
                <div class="form-group">
                    <label className='col-lg-12' for="customInput">Password</label>
                    <div class="mt-1"></div>
                    <input type="text" name="titleVideo" class="form-control txt-password" placeholder="Enter text"/>
                </div>

                <div class="mt-2"></div>
                <div class="form-group">
                    <label className='col-lg-12' for="customInput">Link Download</label>
                    <div class="mt-1 texts">
                        <input type="text" name="images" class="form-control links-txt" placeholder="Enter text"/>
                        <input type="text" name="images" class="form-control links-txt" placeholder="Enter text"/>
                        <input type="text" name="images" class="form-control links-txt" placeholder="Enter text"/>
                        <input type="text" name="images" class="form-control links-txt" placeholder="Enter text"/>
                        <input type="text" name="images" class="form-control links-txt" placeholder="Enter text"/>
                    </div>
                </div>
                <div class="mt-2"></div>
                <div class="form-group">
                    <label className='col-lg-12' for="customInput">URL</label>
                    <div class="mt-1"></div>
                    <input type="text" disabled name="titleVideo" class="form-control txt-url" placeholder="Enter text"/>
                </div>
                <div className='btns'>
                    <button onClick={() => {handleInsertLinks()}} class="btn btn-success">Thêm</button>
                    <button onClick={() => {handleUpdateLinks()}} class="btn btn-primary">Sửa</button>
                </div>
            </div>
            <div className='col-lg-5 list-game'>
                {links.map((link, index) => {
                    return <div onClick={() => {handleShow(link._id)}} key={index} className='game-item col-lg-12'>
                        <div className='col-lg-1 logo'>
                            <img height='100%' src={link.logo} />
                        </div>
                        <div className='col-lg-10 other'>
                            <div className='title'>
                                <p>{link.title} - {link.links.length}</p>
                            </div>
                            <button onClick={() => {handleDelete(link._id)}} className="btn btn-danger btn-xoa">Xóa</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}

export default LinkDownloadManagerPage;