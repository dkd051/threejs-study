import * as THREE from 'three';

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

    // Camera
    const camera = new THREE.PerspectiveCamera(
        75, // 시야각(field of view)
        window.innerWidth / window.innerHeight, // 종횡비(aspect)
        0.1, // near
        1000 // far
    );
    camera.position.z = 5;
    scene.add(camera);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.x = 1;
    light.position.z = 2;
    scene.add(light);

    // Mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 'red'
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 그리기
    function draw() {
        // mesh.rotation.y += 0.1;
        mesh.rotation.y += THREE.MathUtils.degToRad(1);
        mesh.position.y += 0.01;
        if(mesh.position.y > 3) {
            mesh.position.y = 0;
        }
        renderer.render(scene, camera);

        // requestAnimationFrame(draw);
        renderer.setAnimationLoop(draw);
    }

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