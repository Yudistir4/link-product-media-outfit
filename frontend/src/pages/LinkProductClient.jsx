import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {   Input } from '@chakra-ui/react';
import { config } from '../config';

const LinkProductClient = () => {
  const { username } = useParams();
  const [value, setValue] = useState('');
  const [data, setData] = useState(config.data[username]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!config.data[username]) {
      navigate('/404');
    }
  }, []);

  console.log(data);
  const onChange = (e) => {
    setValue(e.target.value);
    if (e.target.value) {
      let result = [
        config.data[username].find(
          (item) => item.number === parseInt(e.target.value)
        ),
      ];
      setData(result);
    } else {
      setData(config.data[username]);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-5 max-w-md m-auto items-center">
      {/* CURRENT USER */}
      <img
        className="w-28 h-28 rounded-full hover:shadow-lg shadow-black"
        src={config.profilePic[username]}
        alt=""
      />

      <h1 className="text-xl font-serif">{username}</h1>
      <p className="text-center">
        Kalo ada link rusak bisa langsung DM instagram ya
      </p>
      <Input
        placeholder="Cari nomer barang..."
        value={value}
        type="number"
        onChange={onChange}
      />
      <div className="flex flex-col text-center gap-3 w-full">
        {data?.map((record) => (
          <div
            key={record?.id}
            className="p-5 border-2 rounded-lg flex gap-3 flex-col "
          >
            {record && (
              <div className="text-xl bg-black/90 shadow-lg shadow-black/30 blue-300 h-9 w-9 m-auto rounded-full font-semibold text-white flex items-center justify-center">
                {record?.number}
              </div>
            )}
            {record?.links?.map((item, i) => (
              <a
                className=" hover:bg-black/80 transition-all hover:scale-105 group flex w-full   border rounded-full p-1"
                key={record.id + i}
                href={item.link}
              >
                <div className="shrink-0 bg-white rounded-full h-8 w-8 font-semibold  flex justify-center items-center border ">
                  {item.number}
                </div>

                <p className="flex items-center justify-center group-hover:text-white transition-all w-full">
                  {item.name}
                </p>
              </a>
            ))}
            {data[0] === undefined && <div>Link Not Found</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkProductClient;
