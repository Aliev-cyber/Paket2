import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Employers = () => {
    const [empdata,empdatachange]=useState(null);
    const navigate=useNavigate();

    const LoadDetail =(id)=>{
        navigate("/employee/detail/"+id)
    }

     const LoadEdit =(id)=>{
        navigate("/employee/edit/"+id)
    }
   
    const RemoveFunction =(id)=>{
        if(window.confirm('Вы точно хотите удалить?')){

            fetch('http://localhost:8002/employee/'+id,{
                method:"DELETE",
            }).then((res)=>{
                alert('Удалено')
                window.location.reload();
            }).catch((err)=>{
                console.log(err.message);
            })
        }
    }

    useEffect(()=>{
        fetch('http://localhost:8002/employee').then((res)=>{
            return res.json();
        }).then((resp)=>{
            empdatachange(resp);
            console.log(resp);
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])
    console.log(empdata, 'dss');


  return (
    <div className='container'>
        <div className='card'>
          <div className='card-body'>
            <div className='divbtn'>
                <Link to="employee/create" className='btn btn-success'>Add New (+)</Link>
            </div>
                <table className='table table-dark table-bordered'>
                    <thead className='text-white'>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Phone</td>
                            <td>Action</td>
                        </tr>
                    </thead>    
                    <tbody>
                        {empdata &&
                            empdata.map(item =>(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                  <a onClick={()=>{LoadEdit(item.id)}} className='btn btn-success'>Edit</a>
                                  <a onClick={()=>{RemoveFunction(item.id)}} className='btn btn-danger'>Remove</a>
                                  <a onClick={()=>{LoadDetail(item.id)}} className='btn btn-primary'>Details</a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Employers