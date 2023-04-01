import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useParams } from 'react-router-dom';
import { Table, Select, Input, ConfigProvider, theme } from 'antd';
import './PlaylistDetailPage.css';

const { Option } = Select;
const { Search } = Input;

const PlaylistDetailPage = () => {
const [searchText, setSearchText] = useState('');
const [searchColumn, setSearchColumn] = useState('');
const [sortCol, setSortCol] = useState('');
const [sortOrder, setSortOrder] = useState('');
const { year } = useParams<{ year: string }>();
const { top50Playlists } = useSelector((state: RootState) => state.playlists);

const columns = [
{ title: 'Title', dataIndex: 'title', key: 'title' },
{ title: 'Artist', dataIndex: 'artist', key: 'artist' },
{ title: 'Genre', dataIndex: 'genre', key: 'genre' },
{ title: 'Year', dataIndex: 'year', key: 'year' },
{ title: 'Duration', dataIndex: 'duration', key: 'duration' },
{ title: 'Popularity', dataIndex: 'popularity', key: 'popularity' },
];

const handleChange = (value: string) => {
setSortCol(value);
setSortOrder('ascend');
if (value === '') {
setSortOrder('');
} else {
setSortOrder('ascend');
}
};

const handleSearch = (value: string) => {
setSearchText(value);
};

const data = top50Playlists.find((playlist: any) => playlist.year === parseInt(year || '', 10))?.songs || [];

const filteredData = sortOrder
? [...data].sort((a: any, b: any) => {
const result = a[sortCol] > b[sortCol] ? 1 : -1;
return sortOrder === 'ascend' ? result : -result;
})
: data;

/* Si il n'y a rien dans la barre de recherche on affiche la liste triée sinon on affiche
les résultats correspondants au texte dans la barre de recherche */
const searchedData =
searchText === ''
? filteredData
: filteredData.filter((item: any) =>
Object.keys(item).some(
(key) =>
item[key].toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1 &&
(searchColumn === '' || searchColumn === key)
)
);

return (
<div className="playlist-detail-page">
<h1>Top 50 - {year}</h1>
<div className="filter-bar">
<ConfigProvider
theme={{ algorithm: theme.darkAlgorithm }}>
<Select defaultValue="" style={{ width: 120 }} onChange={handleChange}>
<Option value="">Default</Option>
{columns.map((column) => (
<Option key={column.key} value={column.key}>
{column.title}
</Option>
))}
</Select>
<Search
placeholder="Search"
onSearch={handleSearch}
onChange={(e) => setSearchText(e.target.value)}
style={{ width: 200 }}
/>
</ConfigProvider>
</div>
<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Table className="playlist-table" columns={columns} dataSource={searchedData} rowKey={(record) => record.title} pagination={false} />
      </ConfigProvider>
    </div>
  );
};

export default PlaylistDetailPage;
