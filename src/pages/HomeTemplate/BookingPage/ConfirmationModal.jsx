import React from 'react';
import { Modal, Button } from 'flowbite-react';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, selectedSeats, total }) {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Xác nhận đặt vé</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <p>Bạn đã chọn {selectedSeats.length} ghế:</p>
          <ul className="list-disc list-inside">
            {selectedSeats.map(seat => (
              <li key={seat.maGhe}>{seat.tenGhe} - {seat.giaVe.toLocaleString()}đ</li>
            ))}
          </ul>
          <p className="font-bold">Tổng tiền: {total.toLocaleString()}đ</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={onClose}>Hủy</Button>
        <Button color="success" onClick={onConfirm}>Xác nhận đặt vé</Button>
      </Modal.Footer>
    </Modal>
  );
}