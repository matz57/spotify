import React, { useState } from "react";
import { Modal, Input } from "antd";
import { useDispatch } from "react-redux";
import { addPlaylist } from "../Slices/playlistsSlice";

interface Props {
visible: boolean;
onClose: () => void;
}

const CreatePlaylistModal: React.FC<Props> = ({ visible, onClose }) => {
const [playlistName, setPlaylistName] = useState("");
const dispatch = useDispatch();

const handleOk = () => {
if (playlistName) {

setPlaylistName("");
onClose();
}
};

const handleCancel = () => {
setPlaylistName("");
onClose();
};

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setPlaylistName(e.target.value);
};

return (
<Modal visible={visible} onOk={handleOk} onCancel={handleCancel}>
<Input placeholder="Playlist Name" value={playlistName} onChange={handleInputChange} />
</Modal>
);
};

export default CreatePlaylistModal;
