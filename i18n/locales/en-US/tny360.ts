import { en } from "@nuxt/ui/runtime/locale/index.js";

export default {
    name: 'TNY - 360',
    title: 'Discover our TNY-360 Robot Dog',
    description: 'Discover our TNY-360 robot dog! A concentration of technology to enable everyone to understand, learn, and explore the world of robotics.',
    header: {
        title: 'TNY - 360',
        desc: 'A powerhouse of technology to [hl](understand), [hl](interact) and [hl](learn)!',
        button: 'Join the waiting list',
    },
    readable: {
        title: '[hl](Advanced robotics), finally readable',
        ing: {
            title: 'Complex engineering [hl](becomes obvious).',
            p1: 'No more tangled cable nests impossible to debug. The TNY-360 introduces semantic electronic design and an "idiot-proof" approach.',
            p2: 'Each PCB has a precise role, clear wiring icons, and QR codes that link you directly to step-by-step documentation.',
        },
        doc: {
            title: 'Documentation [hl](designed for humans).',
            p1: 'Learning should not be a chore. We removed academic jargon to create ultra-visual documentation, thought of like a construction kit.',
            p2: 'Each step is illustrated, each concept is diagrammed. Whether you are a seasoned engineer or an enthusiastic beginner, you can visualize assembly and software logic effortlessly.',
        },
    },
    dev: {
        title: 'The [hl](development platform) of choice',
        open: {
            title: 'A [hl](100% Open-Source) project. Really.',
            p1: 'We hide nothing. The mechanical files (3D - STL/FreeCAD), the electronics (schematics and PCB layouts), the firmware and our suite of companion software are freely available on',
            link: 'our GitHub repositories',
            p2: 'Study them, modify them, improve them: [bd](The TNY-360 is an absolute sandbox.)',
        },
        mod: {
            title: 'A [hl](modular) and highly [hl](modifiable) architecture.',
            p1: 'Forget risky soldering. All our electronics use standard JST-PH connectors: clean, sturdy and infinitely moddable.',
            p2: 'On the mechanical side, our clip system lets you replace armor pieces in a snap. Print your own 3D parts, change colors, add your logo: [bd](This robot becomes your robot.)',
        },
        ext: {
            title: 'Got an idea? [hl](Plug it in)!',
            p1: 'With its fully modular architecture and dorsal extension port, adding a LiDAR sensor or a robotic arm takes seconds.',
            p2: 'We even printed the mechanical dimensions directly on the port! [bd](No need to open the docs to prototype.)',
        },
    },
    evolve: {
        title: 'A robot that [hl](evolves at your pace)',
        poss: {
            title: 'One hardware, [hl](endless) possibilities.',
            p1: 'Whether you are 12 or 45, the TNY-360 adapts to your expertise.',
            tel: 'Start by controlling it with a gamepad or your phone',
            blocks: 'Program it with visual blocks using our apps',
            sdk: 'Level up with our native SDKs in Python or JS/TS',
            ros: 'Go as far as advanced research by integrating it with ROS2'
        },
        learn: {
            title: 'The [hl](ideal) learning vehicle.',
            p1: 'Theory fades, practice stays. The TNY-360 turns abstract concepts (kinematics, algorithms, AI) into a tangible and rewarding project.',
            p2: 'It is [hl](the ultimate STEM tool) for schools, universities and makers.',
        },
    },
    perfs: {
        title: '[hl](Pro-level) performance, at the right price',
        power: {
            title: 'A [hl](power monster) under the hood.',
            p1: 'We pushed the limits of onboard hardware. Powered by a Dual-Core architecture, the TNY-360 computes inverse kinematics with a control loop at [bd](200 Hz).',
            p2: 'Loaded with environmental and proprioceptive sensors, the only limit to its analytical abilities is your imagination.',
        },
        moves: {
            title: 'Exceptional [hl](movement fluidity).',
            p1: 'Most hobby robots run at 50 Hz refresh. We run 4 times faster.',
            p2: 'This extraordinary responsiveness, combined with fine motor control and the IMU, allows the robot to produce an adaptive, intelligent gait with impressive stability, even on rough terrain.',
        },
        alive: {
            title: 'More [hl](alive) than ever.',
            p1: 'The TNY-360 does more than execute lines of code, it lives. Thanks to its autonomous behavior tree, you decide its level of independence:',
            p2: 'Let it freely explore its environment, limit it to reactive animations, or take full control. Its active safeguards constantly prevent falls.',
        },
        hri: {
            title: 'The ultimate tool for [hl](HRI research).',
            p1: 'A robot should not feel cold. With its high-resolution facial display, motorized ears, speaker, microphone and integrated camera, the TNY-360 is built to communicate.',
            p2: 'Generate complex expressions, create anthropomorphic interactions and explore the endless potential of [bd](Human-Robot Interaction (HRI)). It is more than a machine, it is a development companion.',
        },
    },
    specs: {
        title: 'Small by design, but [hl](big on tech).',
        cpu: {
            title: '[hl](2x 240) MHz',
            desc: 'A powerful [hl](ESP32-S3 N16R8) chip for Inverse Kimematics, Sensor Fusion, Computer Vision, and Embeded AI Inference!',
            wifi: {
                title: '[hl](Wi-Fi)',
                desc: '802.11 b/g/n',
            },
            bluetooth: {
                title: '[hl](Bluetooth)',
                desc: 'v5.0 with BLE',
            },
        },
        motors: {
            title: '[hl](12x MG996R) Motors',
            desc: '12 [hl](high-torque all-metal) servos with [hl](position feedback) for precise and powerful movements!',
        },
        screen: {
            title: '[hl](128x64) Screen',
            desc: 'For facial expressions & system info',
        },
        battery: {
            title: '[hl](60+) minutes',
            desc: 'Autonomy with a [hl](31.5Wh LiPo) battery',
        },
        payload: {
            title: '[hl](1) Kg',
            desc: 'Maximum payload for carrying objects',
        },
        weight: {
            title: '[hl](1.8) Kg',
            desc: 'Total weight of the robot',
        },
        speed: {
            title: '[hl](0.8) m/s',
            desc: 'Maximum walking speed',
        },
        imu: {
            title: '[hl](6 Axis) IMU',
            desc: 'Integrated [hl](Accelerometer) and [hl](Gyroscope) for balance and motion sensing',
        },
        camera: {
            title: '[hl](HD) Camera',
            desc: 'A [hl](wide-angle 2MP) camera for :',
            bullet1: 'Computer Vision',
            bullet2: 'Video Streaming',
            bullet3: 'Object Tracking',
        },
    },
    start: {
        title: '[hl](Build) or [hl](order) your own TNY-360!',
        best: 'Best offer',
        barebones: {
            title: 'Tinkerer at [hl](heart)?',
            desc: 'Print your own parts at home and only order what you need!',
            button: 'Get the components',
            features: {
                1: 'Custom PCBs assembled',
                2: 'Components & Custom Motors',
                3: 'Screws & Cables',
            }
        },
        maker: {
            title: 'Feeling [hl](adventurous)?',
            desc: 'You can build your own TNY-360 by receiving the spare parts and the assembly guide!',
            button: 'Start the adventure',
            features: {
                1: 'Custom PCBs assembled',
                2: 'Components & Custom Motors',
                3: '3D printed and prepared parts',
                4: 'Screws & Cables',
            }
        },
        r2r: {
            title: 'Wanna start [hl](now)?',
            desc: 'Order your TNY-360 now and receive it at home, fully assembled and calibrated!',
            button: 'Order now',
            features: {
                1: 'Robot assembled & calibrated',
                2: 'Quick start guide',
                3: 'Assembly & Repair guide',
            }
        },
        completeList: 'Complete list',
        notYetAvailable: 'Not yet available',
        outOfStock: 'Out of stock',
        restock: 'Join the waitlist to be informed of restocks!',
    },
    info: {
        title: 'Our TNY-360 is still under development.\nBe among the first to receive it by',
        button: 'joining our waiting list.'
    }
};