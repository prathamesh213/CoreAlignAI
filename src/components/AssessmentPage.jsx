import React, { useState, useCallback, useEffect, useMemo } from 'react';
import './AssessmentPage.css';

const belbinSections = [
    {
      "title": "Section A: What I believe I can contribute to a team:",
      "sentences": [
        {num: "13", text: "I think I can quickly see and take advantage of new opportunities"},
        {num: "16", text: "I can work well with a very wide range of people"},
        {num: "12", text: "Producing ideas is one of my natural assets"},
        {num: "18", text: "My ability rests in being able to draw people out whenever I detect they have something of value to contribute to group objectives"},
        {num: "17", text: "I can be relied upon to finish any task I undertake"},
        {num: "11", text: "My technical knowledge and experience is usually my major asset"},
        {num: "10", text: "I am always ready to be blunt and outspoken in the cause of making the right things happen"},
        {num: "14", text: "I can usually tell whether a plan or idea will fit a particular situation"},
        {num: "15", text: "I can offer a reasoned and unbiased case for alternative courses of action"}
      ]
    },
    {
      "title": "Section B: If I have a possible shortcoming in team work, it could be that:",
      "sentences": [
        {num: "21", text: "I am not at ease unless meetings are well structured and controlled and generally well conducted"},
        {num: "25", text: "I am inclined to be too generous towards others who have a valid viewpoint that has not been given a proper airing"},
        {num: "27", text: "I am reluctant to contribute unless the subject deals with a field I know well"},
        {num: "24", text: "I have a tendency to talk a lot once the group gets on to a new topic"},
        {num: "20", text: "My objective outlook makes it difficult for me to join in readily and enthusiastically with colleagues"},
        {num: "26", text: "I am sometimes seen as forceful and authoritarian when dealing with important issues"},
        {num: "23", text: "I find it difficult to lead from the front, perhaps because I am over responsive to group atmosphere"},
        {num: "28", text: "I am apt to get caught up in ideas that occur to me and so lose track of what is happening"},
        {num: "22", text: "I am reluctant to express my opinions on proposals or plans that are incomplete or insufficiently detailed"}
      ]
    },
    {
      "title": "Section C: When involved in a project with other people:",
      "sentences": [
        {num: "30", text: "I have an aptitude for influencing people without pressuring them"},
        {num: "32", text: "I am generally effective in preventing careless mistakes or omissions from spoiling the success of an operation"},
        {num: "33", text: "I like to press for action to make sure that the meeting does not waste time or lose sight of the item"},
        {num: "37", text: "I can be counted on to contribute something original"},
        {num: "38", text: "I am always ready to back a good suggestion in the common interest"},
        {num: "34", text: "I am quick to see the possibilities in new ideas and developments"},
        {num: "35", text: "I try to maintain my sense of professionalism"},
        {num: "31", text: "I believe my capacity for judgement can help to bring about the right decision"},
        {num: "36", text: "I can be relied on to bring an organised approach to the demands of the job"}
      ]
    },
    {
      "title": "Section D: My characteristic approach to group work is:",
      "sentences": [
        {num: "48", text: "I maintain a quiet interest in getting to know colleagues better"},
        {num: "42", text: "I contribute where I know what I am talking about"},
        {num: "45", text: "I am not reluctant to challenge the views of others or to hold a minority view myself"},
        {num: "43", text: "I can usually find a line of argument to refute unsound propositions"},
        {num: "44", text: "I think I have a talent for making things work once a plan has to be put into operation"},
        {num: "40", text: "I prefer to avoid the obvious and to open up lines that have not been explored"},
        {num: "47", text: "I bring a touch of perfectionism to any job I undertake"},
        {num: "46", text: "I like to be the one to make contacts outside the group of the firm"},
        {num: "41", text: "While I am interested in all views, I have no hesitation in making up my mind once a decision has to be made"}
      ]
    },
    {
      "title": "Section E: I gain satisfaction in a job because:",
      "sentences": [
        {num: "55", text: "I enjoy analysing situations and weighing up all the possible choices"},
        {num: "53", text: "I am interested in finding practical solutions to problems"},
        {num: "57", text: "I like to feel I am fostering good working relationships"},
        {num: "50", text: "I can have a strong influence on decisions"},
        {num: "51", text: "I have a chance of meeting new people with different ideas"},
        {num: "52", text: "I can get people to agree on priorities and objectives"},
        {num: "54", text: "I feel in my element where I can give a task my full attention"},
        {num: "56", text: "I can find an opportunity to stretch my imagination"},
        {num: "58", text: "I feel I am using my special qualifications and training to advantage"}
      ]
    },
    {
      "title": "Section F: If I am suddenly given a difficult task with limited time and unfamiliar people:",
      "sentences": [
        {num: "63", text: "I like to read as much as I conveniently can on the subject"},
        {num: "67", text: "I would feel like devising a solution on my own then trying to sell it to the group"},
        {num: "61", text: "I would be ready to work with the person who showed the most positive approach"},
        {num: "65", text: "I would find some way of reducing the size of the task by establishing how different individuals can contribute"},
        {num: "66", text: "My natural sense of urgency would help to ensure that we did not fall behind schedule"},
        {num: "62", text: "I believe I would keep cool and maintain my capacity to think straight"},
        {num: "68", text: "In spite of conflicting pressures, I would press ahead with whatever needed to be done"},
        {num: "64", text: "I would tend to assert myself if I felt the group was making no progress"},
        {num: "60", text: "I would open discussions with a view to stimulating new thoughts and getting something moving"}
      ]
    },
    {
      "title": "Section G: With reference to the problems which I experience when working in groups:",
      "sentences": [
        {num: "76", text: "I am apt to overreact when people hold up progress"},
        {num: "70", text: "Some people criticise me for being too analytical"},
        {num: "75", text: "My desire to check that we get the important details right is not always welcome"},
        {num: "71", text: "I tend to show boredom unless I am actively engaged with stimulating people"},
        {num: "74", text: "I find it difficult to get started unless the goals are clear"},
        {num: "78", text: "I am sometimes poor at putting across complex points that occur to me"},
        {num: "73", text: "I am conscious of demanding from others the things I cannot do myself"},
        {num: "72", text: "I am inclined to feel I am wasting time and would do better on my own"},
        {num: "77", text: "I hesitate to express my personal views in front of difficult or powerful people"}
      ]
    }
  ];
  const belbinMatrix = {
    "13": "CO", "16": "SH", "12": "PL", "18": "ME", "17": "IMP", "11": "TW", "10": "RI", "14": "CF", "15": "SP",
    "21": "CO", "25": "SH", "27": "PL", "24": "ME", "20": "IMP", "26": "TW", "23": "RI", "28": "CF", "22": "SP",
    "30": "CO", "32": "SH", "33": "PL", "37": "ME", "38": "IMP", "34": "TW", "35": "RI", "31": "CF", "36": "SP",
    "48": "CO", "42": "SH", "45": "PL", "43": "ME", "44": "IMP", "40": "TW", "47": "RI", "46": "CF", "41": "SP",
    "55": "CO", "53": "SH", "57": "PL", "50": "ME", "51": "IMP", "52": "TW", "54": "RI", "56": "CF", "58": "SP",
    "63": "CO", "67": "SH", "61": "PL", "65": "ME", "66": "IMP", "62": "TW", "68": "RI", "64": "CF", "60": "SP",
    "76": "CO", "70": "SH", "75": "PL", "71": "ME", "74": "IMP", "78": "TW", "73": "RI", "72": "CF", "77": "SP",
};

function BelbinTest({ onTestComplete }) {
    const [section, setSection] = useState(0);
    const [points, setPoints] = useState(() => belbinSections.map(s => Array(s.sentences.length).fill(0)));
    const [counter, setCounter] = useState(10);

    const currentSection = belbinSections[section];
    const totalPointsUsed = useMemo(() => points[section].reduce((acc, val) => acc + val, 0), [points, section]);

    const handlePointChange = useCallback((index, value) => {
        const parsedValue = Math.max(0, Math.min(10, parseInt(value) || 0));
        if (totalPointsUsed - points[section][index] + parsedValue <= 10) {
            setPoints(prevPoints => {
                const newPoints = prevPoints.map((sectionPoints, sectionIndex) => {
                    if (sectionIndex === section) {
                        return sectionPoints.map((point, pointIndex) => {
                            if (pointIndex === index) {
                                return parsedValue;
                            }
                            return point;
                        });
                    }
                    return sectionPoints;
                });

                return newPoints;
            });

        } else {
            alert("Cannot Exceed 10 Points");
        }
    }, [section, setPoints, totalPointsUsed]);

    useEffect(() => {
        setCounter(10 - totalPointsUsed);
    }, [totalPointsUsed]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (totalPointsUsed !== 10) {
            alert("You must assign all 10 points before continuing.");
            return;
        }
        if (section < belbinSections.length - 1) {
            setSection(section + 1);
        } else {
            const calculatedResults = calculateBelbinRoles(points);
            onTestComplete(calculatedResults);
        }
    }, [onTestComplete, points, section, totalPointsUsed]);

    return (
        <div className="assessment-container">
            <h2>{currentSection.title}</h2>
            <form onSubmit={handleSubmit}>
                {currentSection.sentences.map((sentence, index) => (
                    <div key={index} className="sentence-row">
                        <span>{sentence.text}</span>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            value={points[section][index]}
                            onChange={(e) => handlePointChange(index, e.target.value)}
                        />
                    </div>
                ))}
                <div className="counter">Points remaining: {counter}</div>
                <button type="submit" className="go" disabled={totalPointsUsed !== 10}>
                    {section === belbinSections.length - 1 ? "Finish" : "Next Section"}
                </button>
            </form>
        </div>
    );
}

function onClick() {
    const button = document.querySelector('Finish'); }

function calculateBelbinRoles(points) {
    const belbinScores = {
        CO: 0, SH: 0, PL: 0, ME: 0, IMP: 0, TW: 0, RI: 0, CF: 0, SP: 0,
    };
    points.forEach((sectionPoints, sectionIndex) => {
        belbinSections[sectionIndex].sentences.forEach((sentence, sentenceIndex) => {
            const role = belbinMatrix[sentence.num];
            belbinScores[role] += sectionPoints[sentenceIndex];
        });
    });
    console.log("Belbin Score Calculation", belbinScores);
    return belbinScores;
}

function InstructionPage({ onTestStart }) {
    return (
        <div className="instruction-container">
            <h1>Assessment One</h1>
            <p>BELBIN TEAM ROLES QUESTIONNAIRE</p>
            <p>
                This questionnaire is about how you prefer to work in teams and what your distinctive contribution is. There are no right or wrong answers. It should take 15 to 20 minutes to complete - spending longer will not improve the result.
            </p>
            <button className='go' onClick={onTestStart}>Let's Go!</button>
        </div>
    );
}

function ResultsPage({ results }) {
    const sortedRoles = Object.entries(results)
        .sort(([, a], [, b]) => b - a)
        .map(([role, score]) => ({ role, score }));

    return (
        <div className="assessment-container">
            <h2>Belbin Roles Results</h2>
            <p>Here are your top Belbin Roles, based on your assessment:</p>
            <ul>
                {sortedRoles.map(({ role, score }) => (
                    <li key={role}>
                        {role}: {score}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function AssessmentPage() {
    const [testStarted, setTestStarted] = useState(false);
    const [results, setResults] = useState(null);

    const handleTestStart = () => {
        setTestStarted(true);
    };

    const handleTestComplete = useCallback((results) => {
        // Post to Backend
        fetch('http://localhost:8000/api/users/assessmentone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(results),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Backend did not accept');
            }
            return response.json();
        })
        .then(data => {
            console.log('Backend Responded', data);
            setResults(results);
        })
        .catch((error) => {
            console.error('Error Posting', error);
            setResults({ error: 'There was an error with request' });
        });
    }, []);

    return (
        <div className="main-container">
            {testStarted ? (
                <BelbinTest onTestComplete={handleTestComplete} />
            ) : (
                <InstructionPage onTestStart={handleTestStart} />
            )}
            {results && (
                <ResultsPage results={results} />
            )}
        </div>
    );
}

export default AssessmentPage;
export { belbinSections, belbinMatrix };
export { calculateBelbinRoles };
