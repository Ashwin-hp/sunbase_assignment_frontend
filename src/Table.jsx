import React from 'react'
import { useEffect , useState } from 'react'
import axios from 'axios'
import './Table_style.css'

import { useNavigate } from 'react-router-dom';

const Table = () => {

  const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(-1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(0);

    const [ufirstName, setuFirstName] = useState(firstName);
    const [ulastName, setuLastName] = useState(lastName);
    const [uaddress, setuAddress] = useState(address);
    const [ucity, setuCity] = useState(city);
    const [ustate, setuState] = useState(state);
    const [uemail, setuEmail] = useState(email);
    const [uphone, setuPhone] = useState(phone);

    useEffect(()=>{
       axios.get('http://localhost:8080/sunbase/portal/api/assignment/allCustomers')
       .then(res => {console.log(res);setData(res.data)})
       .catch(e => console.log(e))
    },[])

    const handleEdit = (id) =>{
        axios.get('http://localhost:8080/sunbase/portal/api/assignment/'+id)
        .then(res => {
            setuFirstName(res.data[0].first_name);
            setuLastName(res.data[0].last_name);
            setuAddress(res.data[0].address);
            setuCity(res.data[0].city);
            setuState(res.data[0].state);
            setuEmail(res.data[0].email);
            setuPhone(res.data[0].phone);
        })
        .catch(err => console.log(err));
        setEditId(id);
    }

  const handleUpdate = () => {
  if (ufirstName.trim() === '' || ulastName.trim() === '') {
    alert('First Name and Last Name are required fields.');
    return;
  }

  axios
    .put('http://localhost:8080/sunbase/portal/api/assignment/' + editId, {
      id: editId,
      first_name: ufirstName,
      last_name: ulastName,
      address: uaddress,
      city: ucity,
      state: ustate,
      email: uemail,
      phone: uphone,
    })
    .then((res) => {
      console.log(res);
      window.location.reload();
      setEditId(-1);
    })
    .catch((err) => console.log(err));
};


    const handleDelete = (id) =>{
        axios.delete('http://localhost:8080/sunbase/portal/api/assignment/'+id)
        .then(res => {
          window.location.reload();
        })
        .catch(err => console.log(err));
    }

    const handleAddCustomerClick = () => {
    navigate('/add-customer');
  };

  return (
    <div>
    <div className='add-customer'>
      <button className="add-button" onClick={handleAddCustomerClick}>
          Add Customer
        </button>
    </div>
      <table className="customer-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer, index) => (
            customer.id === editId?
            <tr>
                <td><input type="text" value={ufirstName}
                    required
                    onChange={e => setuFirstName(e.target.value)}
                /></td>
                <td><input type="text" value={ulastName}
                    required
                    onChange={e => setuLastName(e.target.value)}
                /></td>
                <td><input type="text" value={uaddress}
                    onChange={e => setuAddress(e.target.value)}
                /></td>
                <td><input type="text" value={ucity}
                    onChange={e => setuCity(e.target.value)}
                /></td>
                <td><input type="text" value={ustate}
                    onChange={e => setuState(e.target.value)}
                /></td>
                <td><input type="text" value={uemail}
                    onChange={e => setuEmail(e.target.value)}
                /></td>
                <td><input type="long" value={uphone}
                    onChange={e => setuPhone(e.target.value)}
                /></td>
                <td>
                <button className="edit-button" onClick={handleUpdate}>Update</button>
              </td>
            </tr> :
            <tr key={index}>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.address}</td>
              <td>{customer.city}</td>
              <td>{customer.state}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <button className="edit-button" onClick={() =>handleEdit(customer.id)}>Edit</button>
                <button className="delete-button" onClick={() =>handleDelete(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table