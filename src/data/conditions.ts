export interface Condition {
    id: string;
    slug: string;
    title: string;
    summary: {
        whatItIs: string;
        symptoms: string;
        whenToSeekHelp: string;
    };
    content: {
        overview: string;
        causes: string[];
        riskFactors: string[];
        prevention: string;
        treatmentApproach: string;
    };
    seo: {
        title: string;
        description: string;
        keywords: string[];
    };
}

export const conditions: Condition[] = [
    {
        id: "knee-pain",
        slug: "knee-pain",
        title: "Knee Pain",
        summary: {
            whatItIs: "Pain arising from the joint, soft tissues or loading mechanics around the knee.",
            symptoms: "Pain during walking, squatting, stairs or sport activities.",
            whenToSeekHelp: "If pain limits daily activity or keeps recurring."
        },
        content: {
            overview: "Knee pain is one of the most common musculoskeletal complaints that brings people to us. Whether it's a sharp pain while running, a dull ache after sitting, or instability during sports, knee issues often stem from a mismatch between the load you place on the joint and its current capacity to handle it. At Atreus Physio, we look beyond just the knee—examining your hip, ankle, and movement mechanics to find the root cause.",
            causes: [
                "Patellofemoral Pain Syndrome (Runner's Knee)",
                "Meniscal Tears or Irritation",
                "Ligament Sprains (ACL, MCL, LCL)",
                "Quadriceps or Hamstring Tendinopathy",
                "Osteoarthritis and joint wear"
            ],
            riskFactors: [
                "Sudden increase in training volume",
                "Poor biomechanics or movement control",
                "Muscle imbalances (weak hips/quads)",
                "Previous injury history"
            ],
            prevention: "Building strong quadriceps and glutes is your best defense against knee pain. Equally important is managing your training load—avoiding 'too much, too soon' allows your tissues to adapt safely.",
            treatmentApproach: "We don't just treat the pain; we rebuild the knee's capacity. Our approach involves acute symptom management followed by progressive loading. We use video analysis to correct squat and running mechanics, ensuring you return to your activities stronger than before."
        },
        seo: {
            title: "Knee Pain Treatment in Trichy | Atreus Physio",
            description: "Expert physiotherapy for knee pain, ACL rehab, and runner's knee in Trichy. Science-based assessment and recovery plans.",
            keywords: ["Knee Pain Trichy", "ACL Rehab", "Meniscus Tear Treatment", "Sports Physio Knee"]
        }
    },
    {
        id: "back-pain",
        slug: "back-pain",
        title: "Back Pain",
        summary: {
            whatItIs: "Pain from spinal joints, discs or soft tissue sensitivity influenced by load and movement.",
            symptoms: "Stiffness, tightness, sharp episodes or discomfort with bending and lifting.",
            whenToSeekHelp: "If pain affects work, sleep or daily function."
        },
        content: {
            overview: "Back pain can be debilitating, but it is rarely dangerous. Most back pain is 'mechanical,' meaning it's related to how your spine moves and bears load. Fear of movement often makes it worse. Our goal is to demystify your pain, helping you understand that 'hurt' doesn't always mean 'harm,' and guiding you back to confident movement.",
            causes: [
                "Disc Herniation or Bulges",
                "Muscle Strains and Spasms",
                "Postural Load Intolerance",
                "Sciatica (Nerve Root Irritation)",
                "Facet Joint Irritation"
            ],
            riskFactors: [
                "Prolonged static postures (sitting/standing)",
                "Heavy lifting with poor mechanics",
                "High stress and poor sleep quality",
                "Lack of physical activity"
            ],
            prevention: "Motion is lotion. Breaking up long periods of sitting with movement is crucial. Strengthening your 'core' isn't just about abs—it's about building a robust trunk that can handle life's demands.",
            treatmentApproach: "We move away from passive treatments like bed rest. Instead, we use graded exposure to movement, manual therapy for improved mobility, and specific strengthening exercises to build a resilient spine that you can trust."
        },
        seo: {
            title: "Back Pain Relief & Physio Trichy | Atreus Physio",
            description: "Specialized physiotherapy for back pain, sciatica, and slip disc in Trichy. Avoid surgery with our active rehab approach.",
            keywords: ["Back Pain Treatment Trichy", "Sciatica Relief", "Spine Rehab", "Physiotherapy for Back Pain"]
        }
    },
    {
        id: "neck-pain",
        slug: "neck-pain",
        title: "Neck Pain",
        summary: {
            whatItIs: "Pain arising from cervical joints, muscles or load intolerance.",
            symptoms: "Difficulty turning, tightness, headaches or radiating discomfort.",
            whenToSeekHelp: "If symptoms persist or limit movement."
        },
        content: {
            overview: "In our digital age, neck pain is increasingly common. 'Tech neck' or posture-related strain plays a role, but it's often about the duration of the posture rather than the posture itself. Neck pain can also lead to cervicogenic headaches or radiating arm pain.",
            causes: [
                "Cervical Spondylosis",
                "Muscle Tension & Trigger Points",
                "Whiplash or Trauma",
                "Disc Issues",
                "Stress-related tension"
            ],
            riskFactors: [
                "Prolonged screen time",
                "High stress levels",
                "Poor ergonomic setup",
                "Weak upper back and neck muscles"
            ],
            prevention: "Ergonomics matters, but variability matters more. Change your position often. Strengthening the deep neck flexors and upper back muscles provides the support your head needs.",
            treatmentApproach: "We combine gentle manual therapy to restore movement with targeted strengthening for the neck and shoulders. We also address thoracic (upper back) mobility, which is often the silent culprit behind neck issues."
        },
        seo: {
            title: "Neck Pain & Headache Physiotherapy Trichy | Atreus Physio",
            description: "Effective relief for neck pain, cervical spondylosis, and headaches. Expert physiotherapy in Trichy.",
            keywords: ["Neck Pain Treatment", "Cervical Spondylosis Physio", "Headache Relief Trichy"]
        }
    },
    {
        id: "shoulder-pain",
        slug: "shoulder-pain",
        title: "Shoulder Pain",
        summary: {
            whatItIs: "Pain from rotator cuff tissues, joint structures or movement coordination issues.",
            symptoms: "Pain during lifting, reaching, overhead tasks or sleep.",
            whenToSeekHelp: "If arm use becomes limited."
        },
        content: {
            overview: "The shoulder is the most mobile joint in the body, which ironically makes it susceptible to injury. From swimmers to office workers, shoulder pain can affect anyone. It's often a balance issue—between mobility and stability.",
            causes: [
                "Rotator Cuff Tendinopathy",
                "Shoulder Impingement",
                "Frozen Shoulder (Adhesive Capsulitis)",
                "Labral Tears",
                "AC Joint Issues"
            ],
            riskFactors: [
                "Repetitive overhead activity",
                "Poor scapular (shoulder blade) control",
                "Diabetes (increases risk of Frozen Shoulder)",
                "Age-related changes"
            ],
            prevention: "Scapular stability is key. Exercises that strengthen the muscles around your shoulder blade provide a stable base for your arm to move. Managing overhead volume in sports is also critical.",
            treatmentApproach: "We meticulously assess your shoulder rhythm. Treatment involves restoring range of motion (especially for frozen shoulder) and progressively loading the rotator cuff to handle the demands of your life and sport."
        },
        seo: {
            title: "Shoulder Pain & Frozen Shoulder Physio Trichy | Atreus Physio",
            description: "Expert care for shoulder pain, rotator cuff injuries, and frozen shoulder in Trichy. Restore your range of motion.",
            keywords: ["Shoulder Pain Physio", "Frozen Shoulder Treatment Trichy", "Rotator Cuff Rehab"]
        }
    },
    {
        id: "ankle-injuries",
        slug: "ankle-injuries",
        title: "Ankle Injuries",
        summary: {
            whatItIs: "Sprains or load related issues affecting ankle stability and movement control.",
            symptoms: "Swelling, instability or pain during walking or sport.",
            whenToSeekHelp: "If weight bearing remains difficult."
        },
        content: {
            overview: "An ankle sprain is often dismissed as a minor injury, but without proper rehab, it can lead to chronic instability. Whether it's a rolled ankle on the basketball court or a misstep on uneven ground, getting stability back is crucial.",
            causes: [
                "Lateral Ankle Sprains (Inversion)",
                "High Ankle Sprains",
                "Achilles Tendinopathy",
                "Plantar Fasciitis",
                "Stress Fractures"
            ],
            riskFactors: [
                "Previous ankle sprains",
                "Poor balance/proprioception",
                "Inappropriate footwear",
                "Weak calf muscles"
            ],
            prevention: "Balance training is non-negotiable. Proprioceptive exercises train your brain to catch the ankle before it rolls. Calf strengthening also protects the joint.",
            treatmentApproach: "We move quickly from protection (reducing swelling) to restoration. Our rehab focuses heavily on balance, hopping, and landing mechanics to ensure your ankle can handle the dynamic forces of sport and life."
        },
        seo: {
            title: "Ankle Sprain & Foot Pain Physio Trichy | Atreus Physio",
            description: "Comprehensive rehab for ankle sprains, heel pain, and sports injuries in Trichy.",
            keywords: ["Ankle Sprain Treatment", "Foot Pain Physio", "Sports Injury Trichy"]
        }
    },
    {
        id: "ligament-injuries",
        slug: "ligament-injuries",
        title: "Ligament Injuries",
        summary: {
            whatItIs: "Injury to stabilizing ligaments in joints like the knee or ankle.",
            symptoms: "Instability, swelling or difficulty with weight bearing and sport.",
            whenToSeekHelp: "If the joint feels unstable or recovery slows."
        },
        content: {
            overview: "Ligaments are the passive stabilizers of your joints. When they are injured (like an ACL tear), your muscles must work overtime to provide stability. Rehab is about training your dynamic stabilizers (muscles) to compensate and eventually protect the healing ligament.",
            causes: [
                "ACL/PCL Tears (Knee)",
                "ATFL Sprains (Ankle)",
                "UCL Injuries (Elbow)",
                "Trauma or non-contact twisting"
            ],
            riskFactors: [
                "High-impact change of direction sports",
                "Fatigue",
                "Poor landing mechanics",
                "Muscle weakness"
            ],
            prevention: "Neuromuscular training—teaching your nerves and muscles to work together—is the gold standard for prevention. Jump landing training and plyometrics are essential.",
            treatmentApproach: "Whether pre-surgery, post-surgery, or non-operative management, our protocol is strict and criteria-based. We don't guess; we test strength, hop distance, and movement quality before clearing you for the next level."
        },
        seo: {
            title: "Ligament Injury & ACL Rehab Trichy | Atreus Physio",
            description: "Specialized post-op and non-operative rehab for ACL, MCL, and other ligament injuries.",
            keywords: ["ACL Rehab Trichy", "Ligament Injury Treatment", "Sports Physio"]
        }
    },
    {
        id: "muscle-strains",
        slug: "muscle-strains",
        title: "Muscle Strains",
        summary: {
            whatItIs: "Injury to muscle fibers due to sudden effort or excessive load.",
            symptoms: "Local pain, tightness, reduced strength or discomfort on stretch.",
            whenToSeekHelp: "If pain limits movement or sport performance."
        },
        content: {
            overview: "A 'pulled muscle' or strain happens when the demand on the muscle exceeds its capacity, often during lengthening (eccentric) movements. Hamstrings and calves are frequent victims.",
            causes: [
                "Hamstring Strains",
                "Calf Strains (Tennis Leg)",
                "Quadriceps Strains",
                "Groin Strains"
            ],
            riskFactors: [
                "Fatigue",
                "Previous injury (biggest risk factor)",
                "Age",
                "Insufficient warm-up"
            ],
            prevention: "Eccentric strength training (lengthening under load) makes muscles longer and stronger, effectively 'immunizing' them against strains. Sprinting regularly (at controlled doses) also prepares the hamstrings.",
            treatmentApproach: "We manage the acute phase to minimize scar tissue, then progressively load the healing muscle. We emphasize lengthening exercises to ensure the new muscle fibers are laid down correctly and prevent re-injury."
        },
        seo: {
            title: "Muscle Strain Treatment Trichy | Atreus Physio",
            description: "Fast recovery for hamstring strains, calf pulls, and sports injuries in Trichy.",
            keywords: ["Muscle Strain Physio", "Hamstring Injury Treatment", "Sports Rehab Trichy"]
        }
    },
    {
        id: "sciatica",
        slug: "sciatica",
        title: "Sciatica",
        summary: {
            whatItIs: "Radiating leg pain due to neural sensitivity or spinal mechanics.",
            symptoms: "Leg pain, numbness, tingling or difficulty with prolonged standing or walking.",
            whenToSeekHelp: "If symptoms persist or worsen over time."
        },
        content: {
            overview: "Sciatica describes the symptom of leg pain originating from the back, not the diagnosis itself. It's often caused by a disc pressing on the nerve or chemical inflammation. It can be intense, but the prognosis is generally good with time and right management.",
            causes: [
                "Lumbar Disc Herniation",
                "Spinal Stenosis",
                "Piriformis Syndrome",
                "Spondylolisthesis"
            ],
            riskFactors: [
                "Age related changes",
                "Obesity",
                "Occupations with heavy twisting/load",
                "Prolonged sitting"
            ],
            prevention: "maintaining a healthy weight and staying active are key. Avoiding prolonged static positions allows the nerve to get blood flow and stay healthy.",
            treatmentApproach: "We focus on 'centralization'—moving the pain out of the leg and back to the spine, which is a sign of healing. Neural flossing (nerve glides) and unloading techniques provide relief, while core work ensures long-term stability."
        },
        seo: {
            title: "Sciatica & Nerve Pain Treatment Trichy | Atreus Physio",
            description: "Effective management for sciatica and radiating leg pain. Physiotherapy to relieve nerve pressure.",
            keywords: ["Sciatica Treatment Trichy", "Leg Pain Physio", "Nerve Pain Relief"]
        }
    }
];
