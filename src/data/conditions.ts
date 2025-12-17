export interface Condition {
    id: string;
    slug: string;
    title: string;
    summary: {
        whatItIs: string;
        whenToSeekHelp: string;
    };
    content: {
        overview: string;
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
            whatItIs: "Knee pain refers to discomfort arising from the knee region that may be influenced by loading patterns, movement behaviour, strength capacity and tissue tolerance rather than a single structure alone.",
            whenToSeekHelp: "Persistent swelling, episodes of giving way, locking sensations, or pain that does not improve with activity modification may require detailed clinical assessment."
        },
        content: {
            overview: "Knee pain is common in daily activities and sports. Symptoms may fluctuate with activity levels, training load or movement demands. In many cases, pain reflects reduced load tolerance or altered movement strategies rather than ongoing tissue damage.",
            treatmentApproach: "ATREUS PHYSIO uses an individualised assessment to identify load tolerance, movement patterns and strength deficits around the knee. Treatment focuses on progressive strengthening, movement retraining and graded load exposure to improve function and reduce symptoms. Rehabilitation is progressed based on response and activity demands rather than pain alone."
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
            whatItIs: "Back pain refers to pain or discomfort experienced in the lumbar or thoracic region and is often influenced by movement tolerance, loading patterns, and nervous system sensitivity rather than a single anatomical structure.",
            whenToSeekHelp: "Pain associated with significant weakness, unexplained weight loss, progressive neurological symptoms or severe night pain should be assessed promptly."
        },
        content: {
            overview: "Most back pain is non-specific and varies from person to person. Symptoms can fluctuate with activity, posture, stress and fatigue levels. Structural findings on scans often do not correlate directly with pain intensity.",
            treatmentApproach: "Back pain is managed through movement-based assessment, education and graded exposure to activity. Treatment focuses on improving movement tolerance, trunk strength and functional capacity while addressing fear and activity limitations. Plans are adapted based on irritability, response to loading and individual presentation."
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
            whatItIs: "Neck pain involves discomfort arising from the cervical region and may be influenced by movement demands, muscle endurance, load tolerance and task-specific stress rather than isolated joint or muscle injury.",
            whenToSeekHelp: "Symptoms such as progressive arm weakness, numbness, coordination difficulties or unexplained neurological changes require further clinical assessment."
        },
        content: {
            overview: "Neck pain can affect daily activities such as driving, desk work or sports. Symptoms often fluctuate and may include stiffness or associated upper neck discomfort depending on activity and load exposure.",
            treatmentApproach: "Management includes assessment of cervical movement, load tolerance and task demands. Treatment involves graded mobility and strengthening exercises along with motor control training to improve function. Progression is guided by symptom response and daily or sport-specific requirements."
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
            whatItIs: "Shoulder pain refers to discomfort around the shoulder complex influenced by loading capacity, movement coordination and tissue tolerance rather than a single tendon or structure in isolation.",
            whenToSeekHelp: "Sudden loss of strength, inability to lift the arm, significant trauma or pain that does not improve with activity modification should be assessed further."
        },
        content: {
            overview: "Shoulder pain is common in overhead activities, lifting and sports. Many cases are related to how the shoulder manages load and movement demands rather than structural damage alone.",
            treatmentApproach: "Shoulder rehabilitation is guided by diagnosis-specific assessment of strength, coordination and loading capacity. Treatment focuses on progressive strengthening, movement coordination and functional loading to support daily activities and sport demands. Progression is individualised based on tolerance and task requirements."
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
            whatItIs: "Ankle injuries include pain or instability around the ankle joint that may occur due to ligament stress, altered movement control or reduced load tolerance.",
            whenToSeekHelp: "Persistent swelling, repeated giving-way episodes or inability to bear weight comfortably may require detailed assessment."
        },
        content: {
            overview: "Ankle symptoms can persist even after initial healing. Recurrent pain or instability is often related to strength, balance and neuromuscular control rather than ongoing ligament damage.",
            treatmentApproach: "Treatment focuses on restoring strength, movement control and load tolerance through progressive exercises. Proprioceptive training and graded return to activity are used to improve stability and function. Rehabilitation timelines are adjusted based on severity and response to loading."
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
            whatItIs: "Ligament injuries involve stress or damage to stabilising ligaments of a joint, affecting movement confidence and load tolerance.",
            whenToSeekHelp: "Marked instability, recurrent giving way, or lack of progress with rehabilitation may require additional investigation or referral."
        },
        content: {
            overview: "Ligament injuries vary widely in severity. Some recover well with rehabilitation, while others may require modified approaches depending on joint stability and functional demands.",
            treatmentApproach: "Management begins with assessment of injury severity and functional stability. Non-operative rehabilitation focuses on strength, neuromuscular control and progressive loading to improve joint stability and function. Referral or modification is considered when recovery does not progress as expected."
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
            whatItIs: "Muscle strains refer to muscle pain or injury that occurs when load exceeds the muscle’s current capacity, which may or may not involve fibre disruption.",
            whenToSeekHelp: "Severe pain, visible deformity or inability to use the muscle normally should be assessed further."
        },
        content: {
            overview: "Many muscle strains result from fatigue, sudden load spikes or inadequate preparation rather than a single traumatic event. Recovery depends on how loading is managed during rehabilitation.",
            treatmentApproach: "Muscle strain rehabilitation uses controlled loading followed by progressive strengthening to restore capacity. Exercises are advanced gradually to match functional and sport demands. Progression is based on tissue response rather than fixed timelines."
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
            whatItIs: "Sciatica refers to radiating leg pain associated with neural sensitivity or load intolerance along the nerve pathway, rather than compression alone.",
            whenToSeekHelp: "Progressive weakness, bowel or bladder changes, or worsening neurological symptoms require urgent assessment."
        },
        content: {
            overview: "Symptoms can vary widely in intensity and location. Pain behaviour often changes with movement, posture and activity levels, reflecting nervous system sensitivity and mechanical tolerance.",
            treatmentApproach: "Management involves differentiating neural sensitivity from mechanical contributors through assessment. Treatment includes graded movement exposure, strength training and functional conditioning to improve tolerance and reduce symptoms. Programs are adapted based on symptom behaviour and response to activity."
        },
        seo: {
            title: "Sciatica & Nerve Pain Treatment Trichy | Atreus Physio",
            description: "Effective management for sciatica and radiating leg pain. Physiotherapy to relieve nerve pressure.",
            keywords: ["Sciatica Treatment Trichy", "Leg Pain Physio", "Nerve Pain Relief"]
        }
    }
];
