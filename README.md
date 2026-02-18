# 🎮 Tic-Tac-Toe Giáo Dục

Trò chơi Tic-Tac-Toe giáo dục tương tác dành cho giáo viên trình chiếu trên lớp học.

## ✨ Tính Năng

### 🎯 Chế Độ Chơi
- **2 Đội Chơi**: Đội X vs Đội O
- **Hệ Thống Câu Hỏi**: Trả lời đúng để chiếm ô
- **Cơ Chế Đặc Biệt**: Trả lời sai → Đối phương chiếm ô
- **2 Loại Câu Hỏi**:
  - **Trắc Nghiệm**: Tự động kiểm tra đáp án
  - **Tự Luận**: Giáo viên chấm điểm

### 🎨 Giao Diện
- **Thiết Kế Hiện Đại**: Dark mode với màu sắc rực rỡ
- **Hiệu Ứng Glassmorphism**: Nền mờ kính sang trọng
- **Animation Mượt Mà**: Chuyển động tự nhiên, hấp dẫn
- **Responsive**: Tối ưu cho màn hình máy chiếu

### ⏱️ Hệ Thống Timer
- **Đếm Ngược Trực Quan**: Progress bar động
- **Cảnh Báo**: Chuyển màu đỏ khi < 5 giây
- **Tự Động Xử Lý**: Hết giờ = Trả lời sai

### 🎉 Hiệu Ứng
- **Âm Thanh**: Đúng, Sai, Hết giờ, Chiến thắng
- **Pháo Hoa**: Khi có đội thắng cuộc
- **Highlight**: Ô thắng cuộc nhấp nháy

## 🚀 Cách Sử Dụng

### Khởi Động
1. Mở file `index.html` trong trình duyệt
2. Nhập tên 2 đội chơi
3. Nhấn "Bắt Đầu Trò Chơi"

### Chơi Game
1. **Chọn Ô**: Click vào ô trống trên bàn cờ
2. **Trả Lời Câu Hỏi**: 
   - **Trắc nghiệm**: Chọn đáp án → Xác nhận
   - **Tự luận**: Giáo viên đánh giá Đúng/Sai
3. **Kết Quả**:
   - ✅ **Đúng**: Đội hiện tại chiếm ô
   - ❌ **Sai**: Đội đối phương chiếm ô
4. **Chiến Thắng**: 3 ô liên tiếp (ngang/dọc/chéo)

## 📝 Cấu Trúc Dữ Liệu

### File `questions.json`

```json
{
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice",
      "question": "Câu hỏi của bạn?",
      "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      "answer": 0,
      "time": 20
    },
    {
      "id": 2,
      "type": "open_ended",
      "question": "Câu hỏi tự luận?",
      "answer": "Đáp án tham khảo...",
      "time": 30
    }
  ]
}
```

### Các Trường Dữ Liệu
- `id`: ID duy nhất của câu hỏi
- `type`: `"multiple_choice"` hoặc `"open_ended"`
- `question`: Nội dung câu hỏi
- `options`: Mảng các lựa chọn (chỉ cho trắc nghiệm)
- `answer`: Index đáp án đúng (0-3) hoặc text (tự luận)
- `time`: Thời gian (giây)

## 🎨 Tùy Chỉnh

### Màu Sắc
Chỉnh sửa trong `styles.css`:
```css
:root {
    --team-x-primary: hsl(10, 85%, 55%);   /* Màu Đội X */
    --team-o-primary: hsl(210, 85%, 55%);  /* Màu Đội O */
}
```

### Thêm Câu Hỏi
1. Mở `questions.json`
2. Thêm object mới vào mảng `questions`
3. Lưu file và reload trang

## 📋 Checklist Phát Triển

### ✅ Phase 1: Setup & Data Loading
- [x] Khởi tạo cấu trúc dự án
- [x] Viết hàm `loadQuestions()`
- [x] Logic chọn ngẫu nhiên câu hỏi

### ✅ Phase 2: Interface Development
- [x] Màn hình chờ với input tên đội
- [x] Bàn cờ 3x3 với scoreboard
- [x] Modal câu hỏi với timer

### ✅ Phase 3: Game Logic Core
- [x] Xử lý lượt chơi
- [x] Xử lý đáp án (trắc nghiệm + tự luận)
- [x] Cơ chế chiếm ô
- [x] Kiểm tra thắng cuộc

### ✅ Phase 4: Polish & Effects
- [x] Âm thanh (Đúng, Sai, Hết giờ, Chiến thắng)
- [x] Hiệu ứng pháo hoa
- [x] Responsive design

## 🛠️ Tech Stack

- **HTML5**: Cấu trúc semantic
- **CSS3**: Animations, Gradients, Glassmorphism
- **Vanilla JavaScript**: Game logic
- **Google Fonts**: Inter & Outfit

## 📱 Tương Thích

- ✅ Chrome, Firefox, Safari, Edge (phiên bản mới)
- ✅ Màn hình máy chiếu (1920x1080+)
- ✅ Tablet & Desktop
- ⚠️ Mobile (hỗ trợ cơ bản)

## 🎓 Hướng Dẫn Giáo Viên

### Chuẩn Bị
1. Chuẩn bị file `questions.json` với câu hỏi phù hợp
2. Test trước khi lên lớp
3. Đảm bảo âm thanh hoạt động

### Trong Lớp
1. Chia lớp thành 2 đội
2. Mỗi đội chọn đại diện trả lời
3. Giáo viên điều khiển và chấm điểm (câu tự luận)
4. Khuyến khích thảo luận nhóm

### Tips
- Đặt thời gian phù hợp với độ khó câu hỏi
- Kết hợp cả trắc nghiệm và tự luận
- Sử dụng câu hỏi ôn tập kiến thức đã học

## 📄 License

MIT License - Tự do sử dụng cho mục đích giáo dục

## 🤝 Đóng Góp

Mọi đóng góp đều được hoan nghênh! Hãy tạo Pull Request hoặc Issue.

---

**Phát triển bởi**: Antigravity AI  
**Phiên bản**: 1.0.0  
**Cập nhật**: 2026-02-16
