import * as THREE from 'three';
import gsap from 'gsap';

export default function example() {
    // Renderer
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('black', 3, 7);

    // Camera
    const camera = new THREE.PerspectiveCamera(
        75, // 시야각(field of view)
        window.innerWidth / window.innerHeight, // 종횡비(aspect)
        0.1, // near
        1000 // far
    );
    camera.position.y = 1;
    camera.position.z = 5;
    scene.add(camera);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.x = 1;
    light.position.y = 3;
    light.position.z = 5;
    scene.add(light);

    // Mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 'red'
    });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    // 그리기
    // const clock = new THREE.Clock();
    let oldTime = Date.now();
    function draw() {
        const newTime = Date.now();
        const delta = newTime - oldTime;
        oldTime = newTime;

        renderer.render(scene, camera);

        // requestAnimationFrame(draw);
        renderer.setAnimationLoop(draw);
    }
    // gsap
    gsap.to(
        mesh.position,
        {
            duration: 1,
            y: 2,
            z: 3,
        }
    )

    function setSize() {
        // 카메라
        camera.aspect = window.innerWidth / window.innerHeight;
        // updateProjectionMatrix 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    // 이벤트
    window.addEventListener('resize', setSize);

    draw();
}