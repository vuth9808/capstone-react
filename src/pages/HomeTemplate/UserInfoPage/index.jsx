import React, { useState } from 'react';
import { Button, Card, Label, TextInput, Tabs, TabItem } from 'flowbite-react';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    taiKhoan: '',
    matKhau: '',
    email: '',
    soDt: '',
    maNhom: '',
    maLoaiNguoiDung: '',
    hoTen: ''
  });

  const [bookingHistory] = useState([
    {
      movieName: 'GLX - Nguyễn Du',
      date: '1-10-2014',
      time: '14:25:00',
      seat: 'ghế 05'
    },
    {
      movieName: 'GLX - Nguyễn Du',
      date: '1-10-2014',
      time: '14:25:00',
      seat: 'ghế 06'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(userInfo)
      });
      if (response.ok) {
        console.log('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs aria-label="User profile tabs">
        <TabItem title="Thông tin cá nhân">
          <Card>
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Email" />
                  </div>
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="taiKhoan" value="Tài khoản" />
                  </div>
                  <TextInput
                    id="taiKhoan"
                    type="text"
                    name="taiKhoan"
                    value={userInfo.taiKhoan}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="hoTen" value="Họ tên" />
                  </div>
                  <TextInput
                    id="hoTen"
                    type="text"
                    name="hoTen"
                    value={userInfo.hoTen}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="matKhau" value="Mật khẩu" />
                  </div>
                  <TextInput
                    id="matKhau"
                    type="password"
                    name="matKhau"
                    value={userInfo.matKhau}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="soDt" value="Số điện thoại" />
                  </div>
                  <TextInput
                    id="soDt"
                    type="tel"
                    name="soDt"
                    value={userInfo.soDt}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleUpdate}>
                  Cập nhật
                </Button>
              </div>
            </form>
          </Card>
        </TabItem>
        
        <TabItem title="Lịch sử đặt vé">
          <Card>
            <div className="space-y-4">
              {bookingHistory.map((booking, index) => (
                <div key={index} className="flex items-center space-x-4 border-b pb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded">
                    <img 
                      src="/api/placeholder/64/64" 
                      alt="Movie poster" 
                      className="w-full h-full object-cover rounded" 
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{booking.movieName}</h3>
                    <p className="text-sm text-gray-600">
                      Ngày đặt: {booking.date} {booking.time} - {booking.seat}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabItem>
      </Tabs>
    </div>
  );
};

export default UserProfile;