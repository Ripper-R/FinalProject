import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check Out Our Healthy Articles!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Segala Hal Tentang Penyakit Lambung Yang Perlu Diketahui'
              label='Penyakit'
              path='/services'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Kenali Beberapa Penyebab Sakit Kepala Yang Akan Membuatmu Tenang'
              label='Penyakit'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Diet Keto: Ketahui Manfaat, Cara Menjalani, dan Risikonya'
              label='Diet&Nutrisi'
              path='/services'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Ketahui Manfaat dan Risiko Diet Atkins Sebelum Melakukannya'
              label='Diet&Nutrisi'
              path='/products'
            />
            <CardItem
              src='images/img-8.jpg'
              text='Jangan Lupakan Beberapa Nutrisi Ini Ketika Diet'
              label='Diet&Nutrisi'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
