import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, child, push, update, set  } from "firebase/database";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Container, ListGroup, Navbar, Row, Stack } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/id'
import { Routes, Route, Outlet, Link } from "react-router-dom";


function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCSD2lu86udoR0EikjCkvW45QoOlVnsbZE",
    authDomain: "final-project-af7d5.firebaseapp.com",
    databaseURL: "https://final-project-af7d5-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "final-project-af7d5",
    storageBucket: "final-project-af7d5.appspot.com",
    messagingSenderId: "772153379471",
    appId: "1:772153379471:web:91e30ce060b39a03f83efa"
  };

  const _1secIntv = 1024
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const [payload, setPayload] = useState({})
  const [inc, setInc] = useState()
  const [formData, setFormData] = useState({})

  useEffect(()=>{
    onValue(ref(database, 'esp32_ta_01'), (snap) => {
      setPayload(snap.val())
    })

    setInterval(()=>{
      setInc(moment().format("dddd, DD MMMM YYYY HH:MM:ss"))

    },_1secIntv)
  }, [database])
  
  const dataH = (e) => {
    e.preventDefault()

    update(ref(database, 'esp32_ta_01'), {
      nama_pasien: formData.nama_pasien,
      nama_obat: formData.nama_obat,
      penyakit_pasien: formData.penyakit_pasien,
      umur_pasien: formData.umur_pasien,
      gender_pasien: formData.gender_pasien,
      jadwal_001: formData.jadwal_001 === "0" ? "0" : moment(formData.jadwal_001, "DD/MM/YYYY HH:MM").valueOf(),
      jadwal_002: formData.jadwal_002 === "0" ? "0" : moment(formData.jadwal_002, "DD/MM/YYYY HH:MM").valueOf(),
      jadwal_003: formData.jadwal_003 === "0" ? "0" : moment(formData.jadwal_003, "DD/MM/YYYY HH:MM").valueOf(),
      jadwal_004: formData.jadwal_004 === "0" ? "0" : moment(formData.jadwal_004, "DD/MM/YYYY HH:MM").valueOf(),
      jadwal_005: formData.jadwal_005 === "0" ? "0" : moment(formData.jadwal_005, "DD/MM/YYYY HH:MM").valueOf()
    })

  }

  const dataH_change = (e) => {
    const {name, value} = e.target
    setFormData((prevForm)=>({...prevForm, [name]: value}))
    console.log(formData)
  }

  const updateValForm = (e) => {
    setFormData(
      {
        ...payload,
        jadwal_001: payload.jadwal_001 === "0" ? "0" : moment(payload.jadwal_001).format("DD/MM/YYYY HH:MM"),
        jadwal_002: payload.jadwal_002 === "0" ? "0" : moment(payload.jadwal_002).format("DD/MM/YYYY HH:MM"),
        jadwal_003: payload.jadwal_003 === "0" ? "0" : moment(payload.jadwal_003).format("DD/MM/YYYY HH:MM"),
        jadwal_004: payload.jadwal_004 === "0" ? "0" : moment(payload.jadwal_004).format("DD/MM/YYYY HH:MM"),
        jadwal_005: payload.jadwal_005 === "0" ? "0" : moment(payload.jadwal_005).format("DD/MM/YYYY HH:MM")
      }
    )
  }

  

  return (
    <>
    <Routes>
      <Route path='/' element={
        <Container>    
          <Navbar className='mb-3 bg-primary'>
            <Container>
              <Navbar.Text className='p-4 fs-2 fw-semibold text-white'>Medicine Reminder Box berbasis IoT</Navbar.Text>
                <Link to={`/editpage`}>
                  <Navbar.Text className='p-4 fw-light text-white' onClick={updateValForm}>Ubah Data</Navbar.Text>
                </Link>
            </Container>
          </Navbar>

          <ListGroup>
            <Row className='mb-3'>
              <Col>
                <ListGroup.Item>
                  <Stack direction='horizontal' gap={1}>
                    <div className='fw-bold'>Nama Pasien</div>
                    <div className='ms-auto'>{payload.nama_pasien}</div>
                  </Stack>
                </ListGroup.Item>
              </Col>

              <Col>
                <ListGroup.Item>
                  <Stack direction='horizontal' gap={1}>
                    <div className='fw-bold'>Nama Obat</div>
                    <div className='ms-auto'>{payload.nama_obat}</div>
                  </Stack>
                </ListGroup.Item>
              </Col>
            </Row>

            <Row className='mb-3'>
              <Col>
                <Row>
                  <Col>
                    <ListGroup.Item>
                      <Stack direction='horizontal' gap={1}>
                        <div className='fw-bold'>Jenis Kelamin</div>
                        <div className='ms-auto'>{payload.gender_pasien}</div>
                      </Stack>
                    </ListGroup.Item>
                  </Col>

                  <Col>
                    <ListGroup.Item>
                      <Stack direction='horizontal' gap={1}>
                        <div className='fw-bold'>Umur Pasien</div>
                        <div className='ms-auto'>{payload.umur_pasien}</div>
                      </Stack>
                    </ListGroup.Item>
                  </Col>
                </Row>

              </Col>

              <Col>
                <ListGroup.Item>
                  <Stack direction='horizontal' gap={1}>
                    <div className='fw-bold'>Penyakit</div>
                    <div className='ms-auto'>{payload.penyakit_pasien}</div>
                  </Stack>
                </ListGroup.Item>
              </Col>
            </Row>

            <Row>
              <Col>
                <ListGroup.Item>
                  <Stack direction='horizontal' gap={3}>
                    <div className='fw-bold fs-1 ms-auto'>{payload.sensor_loadcell}</div>
                    <div className='me-auto'>pcs tersisa</div>
                  </Stack>
                </ListGroup.Item>
              </Col>

              <Col>
                <ListGroup.Item>
                  
                  <Stack direction='horizontal' className='mb-2' gap={1}>
                    <div className='fw-bold'>Jadwal Konsumsi Obat</div>
                    <div className='ms-auto'>
                      {inc}
                    </div>
                  </Stack>

                  <Stack direction='horizontal' gap={1}>
                    <div className='fw-bold'>Jadwal #1</div>
                    <div className='ms-auto'>{payload.jadwal_001 === "0" ? "-" : moment(payload.jadwal_001).format("dddd, DD MMMM YYYY, HH:MM")}</div>
                  </Stack>

                  <Stack direction='horizontal' gap={1}>
                    <div className='fw-bold'>Jadwal #2</div>
                    <div className='ms-auto'>{payload.jadwal_002 === "0" ? "-" : moment(payload.jadwal_002).format("dddd, DD MMMM YYYY, HH:MM")}</div>
                  </Stack>

                  <Stack direction='horizontal' gap={1}>
                    <div className='fw-bold'>Jadwal #3</div>
                    <div className='ms-auto'>{payload.jadwal_003 === "0" ? "-" : moment(payload.jadwal_003).format("dddd, DD MMMM YYYY, HH:MM")}</div>
                  </Stack>

                  <Stack direction='horizontal' gap={1}>
                    <div className='fw-bold'>Jadwal #4</div>
                    <div className='ms-auto'>{payload.jadwal_004 === "0" ? "-" : moment(payload.jadwal_004).format("dddd, DD MMMM YYYY, HH:MM")}</div>
                  </Stack>

                  <Stack direction='horizontal' gap={1}>
                    <div className='fw-bold'>Jadwal #5</div>
                    <div className='ms-auto'>{payload.jadwal_005 === "0" ? "-" : moment(payload.jadwal_005).format("dddd, DD MMMM YYYY, HH:MM")}</div>
                  </Stack>

                </ListGroup.Item>
              </Col>
            </Row>
          </ListGroup>


        </Container>
      }>

        <Route>

        </Route>
      </Route>
      <Route path="editpage" element={
        <form onSubmit={dataH}>
          <Container>
            <Navbar className='mb-3 bg-primary'>
              <Container>
                <Navbar.Text className='p-4 fs-2 fw-semibold text-white'>Medicine Reminder Box berbasis IoT</Navbar.Text>
                <Link to={`/`}>
                  <Navbar.Text className='p-4 fw-light text-white' onClick={updateValForm}>back</Navbar.Text>
                </Link>
              </Container>
            </Navbar>
           <ListGroup>
              <Col >
                <Col className='p-2'>
                  <label htmlFor='nama_pasien'>Nama Pasien </label>
                  <input type='text' id='nama_pasien' name='nama_pasien' value={formData.nama_pasien} onChange={dataH_change} required/>
                </Col>
                
                <Col className='p-2'>
                  <label htmlFor='nama_obat'>Nama Obat </label>
                  <input type='text' id='nama_obat' name='nama_obat' value={formData.nama_obat} onChange={dataH_change} required/>
                </Col>
                
                <Col className='p-2'>
                  <label htmlFor='penyakit_pasien'>Nama Penyakit </label>
                  <input type='text' id='penyakit_pasien' name='penyakit_pasien' value={formData.penyakit_pasien} onChange={dataH_change} required/>
                </Col>
                
                <Col className='p-2'>
                  <Col>Gender</Col>
                  <Col>
                    <label htmlFor='gender_pasien'>L</label>
                    <input type='radio' id='gender_pasien' name='gender_pasien' value="L" onChange={dataH_change} required/>

                    <label htmlFor='gender_pasien'>P</label>
                    <input type='radio' id='gender_pasien' name='gender_pasien' value="P" onChange={dataH_change} required/>
                  </Col>
                </Col>
                
                <Col className='p-2'>
                  <label htmlFor='umur_pasien'>Umur </label>
                  <input type='number' id='umur_pasien' name='umur_pasien' value={formData.umur_pasien} onChange={dataH_change} required/>
                </Col>

                <Col className='p-2'>
                  <label htmlFor='jadwal_001'>jadwal_001</label>
                  <input type='text' id='jadwal_001' name='jadwal_001' value={formData.jadwal_001} onChange={dataH_change} required/>
                </Col>

                <Col className='p-2'>
                  <label htmlFor='jadwal_002'>jadwal_002</label>
                  <input type='text' id='jadwal_002' name='jadwal_002' value={formData.jadwal_002} onChange={dataH_change} required/>
                </Col>

                <Col className='p-2'>
                  <label htmlFor='jadwal_003'>jadwal_003</label>
                  <input type='text' id='jadwal_003' name='jadwal_003' value={formData.jadwal_003} onChange={dataH_change} required/>
                </Col>

                <Col className='p-2'>
                  <label htmlFor='jadwal_004'>jadwal_004</label>
                  <input type='text' id='jadwal_004' name='jadwal_004' value={formData.jadwal_004} onChange={dataH_change} required/>
                </Col>

                <Col className='p-2'>
                  <label htmlFor='jadwal_005'>jadwal_005</label>
                  <input type='text' id='jadwal_005' name='jadwal_005' value={formData.jadwal_005} onChange={dataH_change} required/>
                </Col>

                <Col>
                  <p>Input format jadwal konsumsi obat <span>"DD/MM/YYYY HH:MM"</span></p>
                  <p>Pastikan sesuai dengan format yang telah ditentukan</p>
                  <p>Contoh: 12/21/2021 08:00</p>
                </Col>


                <Col className='p-2'>
                  <button type='submit'>Submit</button>
                </Col>
                
              </Col>
           </ListGroup>
          </Container>
        </form>
        
      }>

      </Route>
      
    </Routes>
    </>
  );
}

export default App;
