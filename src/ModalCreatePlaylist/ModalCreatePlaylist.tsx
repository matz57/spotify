import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addPlaylist, Playlist } from '../Slices/playlistsSlice';
import './ModalCreatePlaylist.css';

interface CreatePlaylistInterface {
    visible: boolean;
    onCancel: () => void;
}

function ModalCreatePlaylist({ visible, onCancel }: CreatePlaylistInterface) {
    const [playlistName, setPlaylistName] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const randomColor = () => {
        const color1 = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        const color2 = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        return `linear-gradient(135deg, ${color1}, ${color2})`;
    };

    const handleCreatePlaylist = () => {
        if (playlistName.trim() === '') {
            setError('Playlist name cannot be empty');
            return;
        } else {
            const newPlaylist: Playlist = {
                id: Math.floor(Math.random() * 1000000).toString(),
                name: playlistName,
                songs: [],
                color: randomColor(),
            };
            dispatch(addPlaylist(newPlaylist));
            setPlaylistName('');
            setError('')
            onCancel();
        }
    };

    return (
        <Modal title="Create Playlist" open={visible} onOk={handleCreatePlaylist} onCancel={onCancel} className="custom-modal" footer={[
            <Button key="submit" className='createButton' onClick={handleCreatePlaylist}>
                Create
            </Button>,
        ]}>
            <Input placeholder="Playlist name" className='custom-input' value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} />
            {error && <div className="error">{error}</div>}
        </Modal>
    );
};

export default ModalCreatePlaylist;
