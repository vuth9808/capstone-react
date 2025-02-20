import React, { useState } from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';
import { 
  Table,
  Button,
  TextInput,
  Card
} from 'flowbite-react';

const MovieManagement = () => {
  const [searchText, setSearchText] = useState('');
  
  const movies = [
    {
      id: '1314',
      image: '/api/placeholder/100/150',
      name: 'Mỹ Toàn',
      description: 'phim hay quá'
    },
    {
      id: '1329',
      image: '/api/placeholder/100/150', 
      name: 'Bỏ Già Rồi',
      description: 'Tui coi rồi nên tui biết'
    },
    {
      id: '1344',
      image: '/api/placeholder/100/150',
      name: 'Avenger',
      description: 'Giám Mục Sống Tốt (Woo Do Hwan) – tên quỷ Satan đó'
    }
  ];

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Phim</h1>
       
      </div>

      <div className="relative mb-6">
        <TextInput
          type="text"
          placeholder="Input search text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          rightIcon={Search}
        />
      </div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Mã phim</Table.HeadCell>
          <Table.HeadCell>Hình ảnh</Table.HeadCell>
          <Table.HeadCell>Tên phim</Table.HeadCell>
          <Table.HeadCell>Mô tả</Table.HeadCell>
          <Table.HeadCell>Hành động</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {movies.map((movie) => (
            <Table.Row key={movie.id} className="bg-white">
              <Table.Cell>{movie.id}</Table.Cell>
              <Table.Cell>
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-20 h-24 object-cover rounded"
                />
              </Table.Cell>
              <Table.Cell>{movie.name}</Table.Cell>
              <Table.Cell className="max-w-md truncate">
                {movie.description}
              </Table.Cell>
              <Table.Cell>
                <div className="flex space-x-2">
                  <Button color="info" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button color="failure" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Card>
  );
};

export default MovieManagement;