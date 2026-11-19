import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const $ = id => document.getElementById(id);
let heartMesh, renderer, scene, camera;
let beatRate = 78;

function heartPoint(t, u) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
  return new THREE.Vector3(x * 0.055, y * 0.055, u * 0.34);
}
function createHeartGeometry() {
  const positions=[], indices=[], rings=90, segments=100;
  for(let i=0;i<=rings;i++){
    const v=i/rings;
    for(let j=0;j<=segments;j++){
      const t=(j/segments)*Math.PI*2;
      const p=heartPoint(t,(v-.5)*2);
      const taper=Math.sin(Math.PI*v)*.8+.2;
      positions.push(p.x*taper,p.y*taper,p.z*taper);
    }
  }
  for(let i=0;i<rings;i++)for(let j=0;j<segments;j++){
    const a=i*(segments+1)+j,b=a+segments+1;
    indices.push(a,b,a+1,b,b+1,a+1);
  }
  const g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  g.setIndex(indices);g.computeVertexNormals();return g;
}
function init3D(){
  const stage = $('heartStage');
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    38,
    stage.clientWidth / stage.clientHeight,
    0.01,
    100
  );
  camera.position.set(0, 0, 4.8);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(stage.clientWidth, stage.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  stage.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xd9edff, 0x26364a, 2.0));

  const key = new THREE.DirectionalLight(0xffffff, 3.0);
  key.position.set(3, 4, 5);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0x75b9e8, 1.8);
  fill.position.set(-4, 1, -3);
  scene.add(fill);

  const rim = new THREE.PointLight(0xff7777, 1.5, 15);
  rim.position.set(0, -2, 3);
  scene.add(rim);

  heartMesh = new THREE.Group();
  scene.add(heartMesh);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = true;
  controls.enableZoom = true;
  controls.zoomSpeed = 1.5;
  controls.screenSpacePanning = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.minDistance = 0.8;
  controls.maxDistance = 12;
  controls.target.set(0, 0, 0);
  controls.update();

  renderer.domElement.style.cursor = 'grab';
  renderer.domElement.style.touchAction = 'none';
  renderer.domElement.style.pointerEvents = 'auto';

  renderer.domElement.addEventListener('pointerdown', () => {
    renderer.domElement.style.cursor = 'grabbing';
  });
  window.addEventListener('pointerup', () => {
    renderer.domElement.style.cursor = 'grab';
  });

  const loading = $('heartLoading');
  loading.textContent = 'Loading anatomical heart model…';

  const loader = new GLTFLoader();

  loader.load(
    '/static/models/organui-heart.glb',
    (gltf) => {
      const model = gltf.scene;

      const bounds = new THREE.Box3().setFromObject(model);
      const center = bounds.getCenter(new THREE.Vector3());
      const size = bounds.getSize(new THREE.Vector3());
      const maxDimension = Math.max(size.x, size.y, size.z);

      if (!Number.isFinite(maxDimension) || maxDimension <= 0) {
        loading.textContent = 'Invalid anatomical model dimensions.';
        return;
      }

      const fitScale = 2.55 / maxDimension;

      model.scale.setScalar(fitScale);
      model.position.set(
        -center.x * fitScale,
        -center.y * fitScale,
        -center.z * fitScale
      );

      heartMesh.add(model);
      loading.style.display = 'none';

      console.info('PulseAR anatomical model loaded:', gltf);
    },
    (event) => {
      if (event.total > 0) {
        const percent = Math.round(event.loaded / event.total * 100);
        loading.textContent = `Loading anatomical model… ${percent}%`;
      }
    },
    (error) => {
      console.error('Heart model loading failed:', error);
      loading.textContent = 'Could not load heart model. Check connection.';
    }
  );

  const clock = new THREE.Clock();

  function animate(){
    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();
    const safeRate = Math.max(20, Math.min(beatRate, 250));
    const period = 60 / safeRate;
    const phase = (t % period) / period;

    const contraction = Math.exp(-Math.pow((phase - 0.14) / 0.075, 2));
    const relaxation = Math.exp(-Math.pow((phase - 0.34) / 0.13, 2)) * 0.18;
    const pulse = Math.min(1, contraction + relaxation);

    const scale = 1 + 0.012 * pulse;
    heartMesh.scale.setScalar(scale);

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (!w || !h) return;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

function currentVitals(){
  return {systolic_bp:Number($('sys').value),diastolic_bp:Number($('dia').value),
    heart_rate:Number($('hr').value),spo2:Number($('spo2').value),
    respiratory_rate:Number($('rr').value),
    stroke_volume_ml:$('sv').value === '' ? null : Number($('sv').value)};
}
function updateCards(v){
  $('hrValue').innerHTML=`${v.heart_rate} <small>bpm</small>`;
  $('bpValue').innerHTML=`${v.systolic_bp}/${v.diastolic_bp} <small>mmHg</small>`;
  $('spo2Value').innerHTML=`${v.spo2} <small>%</small>`;
  $('rrValue').innerHTML=`${v.respiratory_rate} <small>/min</small>`;
  beatRate=v.heart_rate;
  $('beatLabel').textContent=`Demo animation · ${beatRate} bpm setting`;
}
async function runSimulation(v){
  const response=await fetch('/api/simulation/cardiovascular',{method:'POST',
    headers:{'Content-Type':'application/json'},body:JSON.stringify(v)});
  if(!response.ok)throw new Error('Simulation request failed');
  const r=await response.json();
  $('ppResult').textContent=`${r.pulse_pressure_mmHg} mmHg`;
  $('mapResult').textContent=`${r.mean_arterial_pressure_estimate_mmHg} mmHg`;
  $('coResult').textContent=r.cardiac_output_l_min===null?'Unavailable':`${r.cardiac_output_l_min} L/min`;
  $('coStatus').textContent=r.cardiac_output_status;
  $('limitations').textContent=r.limitations.join(' ');
}
$('vitalsForm').addEventListener('submit',async e=>{
  e.preventDefault();const v=currentVitals();
  if(v.diastolic_bp>=v.systolic_bp){$('inputMessage').textContent='Check BP entries: systolic must exceed diastolic.';return;}
  try{
    const saved=await fetch('/api/patients/demo/vitals',{method:'POST',
      headers:{'Content-Type':'application/json'},body:JSON.stringify(v)});
    updateCards(v);await runSimulation(v);
    if(!saved.ok){
      const problem=await saved.json().catch(()=>({}));
      if(saved.status===403){$('inputMessage').textContent=problem.detail||'Public demo: values are used for this session only and are not saved.';return;}
      throw new Error(problem.detail||'Could not save values');
    }
    $('inputMessage').textContent='Demo measurements saved. No clinical interpretation performed.';
  }catch(err){$('inputMessage').textContent=err.message;}
});
$('ecgForm').addEventListener('submit',async e=>{
  e.preventDefault();const file=$('ecgFile').files[0];
  if(!file){$('ecgMessage').textContent='Choose an ECG file first.';return;}
  const data=new FormData();data.append('file',file);
  try{
    const res=await fetch('/api/patients/demo/ecg-image',{method:'POST',body:data});
    const out=await res.json();if(!res.ok)throw new Error(out.detail||'Upload failed');
    const info=out.file_inspection||{};
    const prep=out.preprocessing||{};
    $('ecgMessage').textContent=[
      `Upload successful: ${out.filename}`,
      `Status: ${out.status}`,
      `File type: ${info.file_type||'Unknown'}`,
      `Pages: ${info.page_count??'Unknown'}`,
      `Image dimensions: ${prep.image_width_px||info.image_width_px||'—'} × ${prep.image_height_px||info.image_height_px||'—'} px`,
      `Processing stage: ${prep.processing_stage||'Not available'}`,
      `Contrast: ${prep.contrast_std??'—'}`,
      `Brightness: ${prep.mean_brightness??'—'}`,
      `Quality flags: ${prep.quality_flags?.length ? prep.quality_flags.join('; ') : 'None'}`,
      `Calibration: ${prep.calibration_status||'Not verified'}`,
      `Waveform extraction: ${prep.waveform_extraction||'Not implemented'}`,
      `Heart rate: ${prep.heart_rate_bpm??'Not available'}`,
      out.message,
      'Educational preprocessing only — no ECG interpretation or diagnosis.'
    ].join('\\n');
  }catch(err){$('ecgMessage').textContent=err.message;}
});

let cameraStream = null;

const cameraVideo = $('cameraVideo');
const cameraStatus = $('cameraStatus');
const cameraInfo = $('cameraInfo');
const cameraPlaceholder = $('cameraPlaceholder');

$('cameraStart').addEventListener('click', async () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    cameraInfo.textContent = 'Camera access is unavailable. Open PulseAR through localhost or HTTPS.';
    return;
  }

  $('cameraStart').disabled = true;
  cameraInfo.textContent = 'Requesting camera access…';

  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false
    });

    cameraVideo.srcObject = cameraStream;
    await cameraVideo.play();

    cameraPlaceholder.style.display = 'none';
    cameraStatus.textContent = '● CAMERA LIVE';
    cameraStatus.style.borderColor = '#32675f';
    cameraInfo.textContent = `Live video · ${cameraVideo.videoWidth} × ${cameraVideo.videoHeight}`;
    $('cameraStop').disabled = false;
    $('captureECG').disabled = false;
  } catch (error) {
    cameraStatus.textContent = '● CAMERA OFF';
    cameraInfo.textContent = error.name === 'NotAllowedError'
      ? 'Camera permission denied. Allow camera access for your browser in macOS Privacy & Security.'
      : error.name === 'NotFoundError'
        ? 'No camera was found.'
        : `Camera error: ${error.message}`;
    $('cameraStart').disabled = false;
  }
});

$('cameraStop').addEventListener('click', () => {
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }

  cameraVideo.srcObject = null;
  cameraPlaceholder.style.display = 'grid';
  cameraStatus.textContent = '● CAMERA OFF';
  cameraInfo.textContent = 'Camera stopped.';
  $('cameraStart').disabled = false;
  $('cameraStop').disabled = true;
  $('captureECG').disabled = true;
});


let capturedECGBlob = null;
let capturedECGUrl = null;

$('captureECG').addEventListener('click', () => {
  if (!cameraStream || !cameraVideo.videoWidth || !cameraVideo.videoHeight) {
    cameraInfo.textContent = 'Start the camera and wait for a clear image before capturing.';
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.width = cameraVideo.videoWidth;
  canvas.height = cameraVideo.videoHeight;

  const context = canvas.getContext('2d');
  context.drawImage(cameraVideo, 0, 0, canvas.width, canvas.height);

  canvas.toBlob((blob) => {
    if (!blob) {
      cameraInfo.textContent = 'Could not capture the camera image. Please try again.';
      return;
    }

    if (capturedECGUrl) URL.revokeObjectURL(capturedECGUrl);

    capturedECGBlob = blob;
    capturedECGUrl = URL.createObjectURL(blob);

    $('ecgPreview').src = capturedECGUrl;
    $('ecgCapturePanel').hidden = false;
    $('captureInfo').textContent =
      `Captured image · ${canvas.width} × ${canvas.height} px · Review before saving.`;
    $('saveECG').disabled = false;
    cameraInfo.textContent = 'ECG image captured. Review the preview before saving.';
  }, 'image/jpeg', 0.95);
});

$('saveECG').addEventListener('click', async () => {
  if (!capturedECGBlob) {
    $('captureInfo').textContent = 'Capture an image first.';
    return;
  }

  const saveButton = $('saveECG');
  saveButton.disabled = true;
  $('captureInfo').textContent = 'Saving image and checking image quality…';

  try {
    const formData = new FormData();
    formData.append('file', capturedECGBlob, `camera-ecg-${Date.now()}.jpg`);

    const response = await fetch('/api/patients/demo/ecg-image', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.detail || `Upload failed (${response.status})`);
    }

    const prep = result.preprocessing || {};
    $('captureInfo').textContent = [
      `Saved successfully · Upload ID: ${result.upload_id}`,
      `Image: ${prep.image_width_px || '—'} × ${prep.image_height_px || '—'} px`,
      `Contrast: ${prep.contrast_std ?? '—'}`,
      `Brightness: ${prep.mean_brightness ?? '—'}`,
      `Quality flags: ${prep.quality_flags?.length ? prep.quality_flags.join('; ') : 'None'}`,
      `Calibration: ${prep.calibration_status || 'Not verified'}`,
      'Educational image processing only. No ECG interpretation or diagnosis.'
    ].join('\n');
  } catch (error) {
    $('captureInfo').textContent = `Save failed: ${error.message}`;
    saveButton.disabled = false;
  }
});

window.addEventListener('beforeunload', () => {
  if (cameraStream) cameraStream.getTracks().forEach(track => track.stop());
});

init3D();runSimulation(currentVitals()).catch(()=>{});
