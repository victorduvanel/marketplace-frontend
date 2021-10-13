import React, { useState } from "react";
import { Input, Space, Select } from "antd";
import { SearchOutlined, AudioOutlined } from "@ant-design/icons";
import moment from "moment";
import { useHistory } from "react-router";

// destructure values from ant components
const { Option } = Select;

const Search = () => {
  // state
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  const history = useHistory();

  const handleSubmit = () => {
    history.push(
      `/search-result?quantity=${quantity}&price=${price}&name=${name}`
    );
  };

  return (
    <div className="d-flex pb-3">
      <div className="w-100">
      <Select
        onChange={(value) => setQuantity(value)}
        className=""
        size="large"
        placeholder="Quantité"
      >
        <Option key={1}>{1}</Option>
        <Option key={2}>{2}</Option>
        <Option key={3}>{3}</Option>
        <Option key={4}>{4}</Option>
      </Select>
      <Input placeholder="chercher"></Input>
      <SearchOutlined
        onClick={handleSubmit}
        className="btn btn-primary p-3 btn-square"
      />
      </div>
    </div>
  );
};

export default Search;
