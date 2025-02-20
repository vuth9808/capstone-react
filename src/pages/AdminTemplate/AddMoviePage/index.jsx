import React, { useState } from 'react';
import { 
  Card,
  TextInput,
  Textarea,
  Label,
  Button,
  ToggleSwitch,
//   Select,
  FileInput,
//   DatePicker
} from 'flowbite-react';

const MovieEditForm = () => {
  const [movieData, setMovieData] = useState({
    maPhim: '',
    tenPhim: '',
    trailer: '',
    moTa: '',
    maNhom: 'GP01',
    ngayKhoiChieu: '',
    sapChieu: true,
    dangChieu: true,
    hot: true,
    danhGia: 10,
    hinhAnh: null
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleChange = (name, checked) => {
    setMovieData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMovieData(prev => ({
        ...prev,
        hinhAnh: file
      }));
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(movieData);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold">Thêm mới phim</h2>
        
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <div className="mb-4">
              <Label htmlFor="tenPhim">Tên phim</Label>
              <TextInput
                id="tenPhim"
                name="tenPhim"
                value={movieData.tenPhim}
                onChange={handleInputChange}
                placeholder="Avenger 123"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="trailer">Trailer</Label>
              <TextInput
                id="trailer"
                name="trailer"
                value={movieData.trailer}
                onChange={handleInputChange}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="moTa">Mô tả</Label>
              <Textarea
                id="moTa"
                name="moTa"
                value={movieData.moTa}
                onChange={handleInputChange}
                rows={4}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="ngayKhoiChieu">Ngày khởi chiếu</Label>
              <TextInput
                type="date"
                id="ngayKhoiChieu"
                name="ngayKhoiChieu"
                value={movieData.ngayKhoiChieu}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="danhGia">Số sao</Label>
              <TextInput
                type="number"
                id="danhGia"
                name="danhGia"
                min="0"
                max="10"
                value={movieData.danhGia}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-4">
              <Label>Hình ảnh</Label>
              <FileInput
                id="hinhAnh"
                name="hinhAnh"
                onChange={handleFileChange}
                accept="image/*"
              />
              {previewImage && (
                <div className="mt-2">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="max-w-full h-auto max-h-48 object-contain"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dangChieu">Đang chiếu</Label>
                <ToggleSwitch
                  id="dangChieu"
                  checked={movieData.dangChieu}
                  onChange={(checked) => handleToggleChange('dangChieu', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="sapChieu">Sắp chiếu</Label>
                <ToggleSwitch
                  id="sapChieu"
                  checked={movieData.sapChieu}
                  onChange={(checked) => handleToggleChange('sapChieu', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="hot">Hot</Label>
                <ToggleSwitch
                  id="hot"
                  checked={movieData.hot}
                  onChange={(checked) => handleToggleChange('hot', checked)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="submit" color="blue">
            Cập nhật
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default MovieEditForm;