import axios from 'axios';
import './modpage.scss'
import { useEffect, useState, useRef } from 'react';

function ModPage() {

    const [links, setLinks] = useState([])
    const [id , setId] = useState('')
    useEffect(() => {
        axios.get('https://ic-gaming-node-js.vercel.app/mods/mod-api-v1')
            .then(res => setLinks(res.data))
    }, [])

    const handleInsertMods = () => {
        const input = document.getElementsByClassName('links-txt')
        const links = [...input].map(item => item.value)
        const linkDownload = links.filter(item => item.trim() !== '');

        const formData = new FormData();
        const imageFiles = imageUser.current.files; 
        for (let i = 0; i < imageFiles.length; i++) {
            formData.append(`images`, imageFiles[i]);
        }

        const title = document.querySelector('.txt-title').value
        const video = document.querySelector('.txt-video').value
        const description = document.querySelector('.txt-description').value
        const origin = document.querySelector('.txt-origin-game').value
        const criteria = document.querySelector('.txt-criteria').value

        let str = ''
        linkDownload.forEach((item,index) => {
            if (index == 0) {
                str += item
            } else {
                str += '!' + item 
            }
        })

        formData.append('title', title);
        formData.append('video', video);
        formData.append('linkDownload', str);
        formData.append('description', description);
        formData.append('originGame', origin);
        formData.append('criteria', criteria);

        axios.post('https://ic-gaming-node-js.vercel.app/mods/insert', formData , {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                if(res.data.status == 200) {
                    window.location.reload()
                }
            })
    }

    const handleDelete = (_id) => {
        axios.post('https://ic-gaming-node-js.vercel.app/mods/delete', {id : _id})
            .then(res => {
                if(res.data.status == 200) {
                    window.location.reload()
                }
            })
    }

    const handleShow = (_id) => {
        const input = document.getElementsByClassName('links-txt')
        const input1 = document.getElementsByClassName('images-txt')
        axios.get('https://ic-gaming-node-js.vercel.app/mods/getById?id='+ _id)
            .then(res => {
                document.querySelector('.txt-title').value = res.data.title
                document.querySelector('.txt-video').value = res.data.video
                document.querySelector('.txt-description').value = res.data.description
                document.querySelector('.txt-origin-game').value = res.data.originGame
                document.querySelector('.txt-criteria').value = res.data.criteria

                for (let i = 0 ; i < input.length ; i++) {
                    input[i].value = ''
                }
                res.data.linkDownload.forEach((link, index) => {
                    input[index].value = link
                })
                setId(_id)
            })
    }

    const handleUpdateMods = () => {
        const title = document.querySelector('.txt-title').value
        const video = document.querySelector('.txt-video').value
        const description = document.querySelector('.txt-description').value
        const origin = document.querySelector('.txt-origin-game').value
        const criteria = document.querySelector('.txt-criteria').value

        const input = document.getElementsByClassName('links-txt')
        const links = [...input].map(item => item.value)
        const linkDownload = links.filter(item => item.trim() !== '');


        if (id != '') {
            axios.post('https://ic-gaming-node-js.vercel.app/mods/update', {id : id,title : title, video : video, linkDownload : linkDownload, description : description, criteria : criteria, originGame : origin})
                .then(res => {
                    if(res.data.status == 200) {
                        window.location.reload()
                    }
                })
        }
    }
    const imageUser = useRef()

    return (
        <div id='links-manager-page' className='col-lg-12'>
            <div className='col-lg-6 form-input'>
                <div className="mt-2"></div>
                <div className="form-group">
                    <label className='col-lg-12' htmlFor="customInput">Title</label>
                    <div className="mt-1"></div>
                    <input type="text" name="titleVideo" className="form-control txt-title" placeholder="Enter text"/>
                </div>
                
                <div className="mt-2"></div>
                <div className="form-group">
                    <label className='col-lg-12' htmlFor="customInput">Video ID</label>
                    <div className="mt-1"></div>
                    <input type="text" name="titleVideo" className="form-control txt-video" placeholder="Enter text"/>
                </div>

                <div className="mt-2"></div>
                <div className="form-group">
                    <label className='col-lg-12' htmlFor="customInput">Description</label>
                    <div className="mt-1"></div>
                    <input type="text" name="titleVideo" className="form-control txt-description" placeholder="Enter text"/>
                </div>
                <div className="mt-2"></div>
                <div className="form-group">
                    <label className='col-lg-12' htmlFor="customInput">Origin Game</label>
                    <div className="mt-1"></div>
                    <input type="text" name="titleVideo" className="form-control txt-origin-game" placeholder="Enter text"/>
                </div>
                <div className="mt-2"></div>
                <div className="form-group">
                    <label className='col-lg-12' htmlFor="customInput">Criteria</label>
                    <div className="mt-1"></div>
                    <input type="text" name="titleVideo" className="form-control txt-criteria" placeholder="Enter text"/>
                </div>
                <div className="mt-2"></div>
                <div className="form-group">
                    <label className='col-lg-12' htmlFor="customInput">Images</label>
                    <div className="mt-1 texts">
                        <input ref={imageUser} type="file" name="images" multiple className="image-user" accept=".jpg, .jpeg, .png"/>
                    </div>
                </div>
                <div className="mt-2"></div>
                <div className="form-group">
                    <label className='col-lg-12' htmlFor="customInput">Link Download</label>
                    <div className="mt-1 texts">
                        <input type="text" name="images" className="form-control links-txt" placeholder="Enter text"/>
                    </div>
                </div>
                <div className='btns'>
                {/* onClick={() => {handleInsertMods()}} */}
                    <button onClick={() => {handleInsertMods()}} className="btn btn-success">Thêm</button>
                    <button onClick={() => {handleUpdateMods()}} className="btn btn-primary">Sửa</button>
                </div> 
            </div>
            <div className='col-lg-5 list-game'>
                {links.map((link, index) => {
                    return <div onClick={() => {handleShow(link._id)}} key={index} className='game-item col-lg-12'>
                        <div className='col-lg-1 logo'>
                            <img height='100%' src={link.images[0]} />
                        </div>
                        <div className='col-lg-10 other'>
                            <div className='title'>
                                <p>{link.title}</p>
                            </div>
                            <button onClick={() => {handleDelete(link._id)}} className="btn btn-danger btn-xoa">Xóa</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}

export default ModPage;