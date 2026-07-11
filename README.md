# HIU HRM

HIU HRM la ung dung web quan ly nhan su duoc phat trien cho cac nghiep vu HRM.

## Cau truc nhanh

- `main`: chi dung de gioi thieu du an va huong dan lam viec.
- `developer`: chua toan bo ma nguon, cau hinh, test va tai lieu ky thuat cua du an.

## Lam viec voi ma nguon

Chuyen sang nhanh `developer` de phat trien:

```bash
git switch developer
```

Sau khi o nhanh `developer`, cai dat va chay du an:

```bash
npm install
npm run dev
```

Kiem tra chat luong code:

```bash
npm run lint
npm run typecheck
npm run test:run
```

Build ban phat hanh:

```bash
npm run build
```

## Ghi chu

Khong commit source code truc tiep vao `main`. Moi thay doi ve ung dung nen duoc thuc hien tren `developer` hoac cac nhanh tinh nang duoc tach tu `developer`.
