import React from 'react';
import Avatar from '../../../Avatar/Avatar';
import cl from './Post.module.css'

function Post(props) {
    return (
        <li className={cl.item}>
            <a className={cl.imgContainer} href="#">
                <Avatar/>
            </a>
            <p className={cl.article}>{props.message}</p>
        </li>
    );
}

export default Post;