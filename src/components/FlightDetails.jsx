import React, { useEffect, useState } from 'react'
import { useFlightDetails } from '../contexts/FlightContext'
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';



export default function FlightDetails() {
     const initialFilters = {
    names:'',
    minPrice: '',
    maxPrice: '',
    dep: '',
    arr:''
  }


  const {filteredDetails,totalFlights,filerFlightData,sortFlightData} = useFlightDetails();
  const [setFilterStatus] = useState(false);
  const [filters,setFilter] = useState(initialFilters);
  const [sortBy,setSortBy] = useState(
    {
      field : '',
      direction : 'asc'
    }
  );



  function handleChange(e){
     
      const {name,value} = e.target;
        setFilter(prev => ({
        ...prev,
        [name]: value
      }));

      setFilterStatus(true);

      
    }

    function handleSort(col){
      const dir = sortBy.direction == 'asc' ? 'desc' : 'asc';
      setSortBy({...sortBy,field:col,direction:dir})

    }

    function handleSortClose(){
      setSortBy({...sortBy,field:''})
    }

    useEffect(()=>{
      
        filerFlightData(filters)
        if(sortBy.field){
          sortFlightData(sortBy.field,sortBy.direction)
      }
    },[filters,sortBy])

  return (
<div className="container mt-4">
  <div className="p-4 shadow-sm rounded-4" style={{ backgroundColor: "#f8f5f0" }}>
      <Form className="mb-4">
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="text-muted small" >Name</Form.Label>
              <Form.Control className="rounded-pill"
                placeholder="Search by Name"
                name="names"
                value={filters.names}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label className="text-muted small">Min Price</Form.Label>
              <Form.Control className="rounded-pill"
                type="number"
                placeholder="Min Price"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label className="text-muted small">Max Price</Form.Label>
              <Form.Control className="rounded-pill"
                type="number"
                placeholder="Max Price"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label className="text-muted small">Departure</Form.Label>
              <Form.Control className="rounded-pill"
                type="time"
                name="dep"
                value={filters.dep}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label className="text-muted small">Arrival</Form.Label>
              <Form.Control className="rounded-pill"
                type="time"
                name="arr"
                value={filters.arr}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
          <Button variant="outline-dark" className="rounded-pill px-4 mt-2" onClick={()=>{
            {
              setFilterStatus(false)}
              setFilter(initialFilters)

          }}>Reset</Button>
          </Col>
        </Row>
      </Form>

         <Table bordered hover className="align-middle bg-white rounded-3 overflow-hidden">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Service</th>
                <th>From</th>
                <th>To</th>
                <th > <span style={{ cursor: 'pointer', fontWeight: 500, color: '#247fce'  }} onClick={()=>handleSort('price')}>Price {sortBy.field == 'price' ? sortBy.direction == 'asc' ? '↑' : '↓' : ''}</span>  {sortBy.field == 'price' ? <span onClick={handleSortClose}>X</span> : ''} </th>
                <th ><span style={{ cursor: 'pointer', fontWeight: 500, color: '#247fce' }} onClick={()=>handleSort('duration')}>Duration {sortBy.field == 'duration' ? sortBy.direction == 'asc' ? '↑' : '↓' : ''}</span> {sortBy.field == 'duration' ? <span onClick={handleSortClose}>X</span> : ''}</th>
                <th ><span style={{ cursor: 'pointer', fontWeight: 500, color: '#247fce' }} onClick={()=>handleSort('arr')}>Arrival {sortBy.field == 'arr' ? sortBy.direction == 'asc' ? '↑' : '↓' : ''}</span>{sortBy.field == 'arr' ? <span onClick={handleSortClose}>X</span> : ''}</th>
                <th ><span style={{ cursor: 'pointer', fontWeight: 500, color: '#247fce' }} onClick={()=>handleSort('dep')} >Departure {sortBy.field == 'dep' ? sortBy.direction == 'asc' ? '↑' : '↓' : ''}</span>{sortBy.field == 'dep' ? <span onClick={handleSortClose}>X</span> : ''}</th>

              </tr>
            </thead>
            <tbody className="table-group-divider">
              {totalFlights > 0 ? (filteredDetails.map((item,index)=>(
                <tr key={index}>
                  <td>{index+1} </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={URL.createObjectURL(item.logo)}
                        width="40"
                        height="40"
                        style={{ objectFit: 'contain' }}
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>{item.from}</td>
                  <td>{item.to}</td>
                  <td>{item.price}</td>
                  <td>{item.duration}</td>
                  <td>{item.arr}</td>
                  <td>{item.dep}</td>
                
                </tr>
              )
              )) : 
              (
            <tr>
              <td colSpan="8" className="text-center text-muted py-4">No Flights Found</td>
            </tr>
          )}
            </tbody>
     </Table>
    </div>
  </div>
  )
}

