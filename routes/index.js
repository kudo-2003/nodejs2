var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//CONECTING DB// APP CONFI
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});
//SCHEMA
let SinhVien = mongoose.Schema({
    MaSinhVien: {
        type: String,
    },
    NgaySinh: {
        type: String,
    },
    GioiTinh: {
        type: String,
    },
    QueQuan: {
        type: String,
    }

});

//MODEL
let Lop = mongoose.model('Lop', SinhVien);

/* GET home page. */
router.get('/', function(req, res, next) {
    Lop.find({}, function(error, data) {
        console.log('Danh sach sinh vien', data)
        res.render('index', { lops: data })
    })
});

router.get('/form-add', function(req, res, next) {
    res.render('form-add', {});
})

router.post('/add', function(req, res, next) {
    Lop.create(req.body);
    res.redirect('/');
})

router.get('/form-add/:id', function(req, res, next) {
    Lop.findById(req.params.id, (err, data) => {
        res.render('form-add', { student: data });
    })
})

router.post('/add', function(req, res, next) {
    Lop.findByIdAndUpdate(req.body.id, req.body, (err, data) => {
        res.redirect('/');
    })
})

router.get('/form-su-chua/:id', function(req, res, next) {
    Lop.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/')
    })
})
router.get('/xoa/:id', function(req, res, next) {
    Student.findById(req.params.id, (err, data) => {
        Lop.render('xoa', { student: data });
    })
})

router.post('/xoa', function(req, res, next) {
    Lop.findByIdAndUpdate(req.body.id, req.body, (err, data) => {
        res.redirect('/');
    })
})
module.exports = router;