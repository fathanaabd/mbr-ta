import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Container, ListGroup, Navbar, Row, Stack } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import moment from 'moment';

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
  const [schd_arr, set_schd_arr] = useState([])
  const [inc, setInc] = useState(moment().format())

  useEffect(()=>{
    onValue(ref(database, 'esp32_ta_01'), (snap) => {
      setPayload(snap.val())
      set_schd_arr(Object.assign(snap.val().jadwal))

    })

    setInterval(()=>{
      setInc(moment().toLocaleString())
    },_1secIntv)

  }, [database])
  

  return (
    <>
      <Container>
        
        <Navbar className='mb-3 bg-primary'>
          <Container>
            <Navbar.Text className='p-4 fs-2 fw-semibold text-white'>Medicine Reminder Box berbasis IoT</Navbar.Text>
            <Navbar.Text className='p-4 fw-light text-white'>edit data</Navbar.Text>
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

                {
                  Object.keys(schd_arr).map((key) => (
                    <Stack key={key} direction='horizontal' gap={1}>
                      <div className='fw-bold'>{"Jadwal Ke-"+schd_arr[key].id}</div>
                      <div className='ms-auto'>{moment(schd_arr[key].epoch).toLocaleString()}</div>
                    </Stack>
                  ))
                }

              </ListGroup.Item>
            </Col>
          </Row>
        </ListGroup>


      </Container>

    </>
  );
}

export default App;
