import Marquee from "react-fast-marquee";
import image1 from "./assets/images/IMG_4662.jpg";
import image2 from "./assets/images/IMG_4663.jpg";
import image3 from "./assets/images/IMG_4664.jpg";
import image4 from "./assets/images/IMG_4665.jpg";
import image5 from "./assets/images/IMG_4666.jpg";
import image6 from "./assets/images/IMG_4667.jpg";
import image7 from "./assets/images/IMG_4668.jpg";
import image8 from "./assets/images/IMG_4669.jpg";
import image9 from "./assets/images/IMG_4670.jpg";
import image10 from "./assets/images/IMG_4671.jpg";
import image11 from "./assets/images/IMG_4672.jpg";

import { useEffect, useState } from "react";
import { ModalFrame, ModalHead, ModalBody, ModalFooter } from "./components/Modal";
import { Heart, Mail, MessageCircle, Globe, 
  // Download
 } from "lucide-react";
// import jsPDF from "jspdf";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000"

const marqueeImages = [
    image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image1, image2, image3, image4
];

type Note = {
    _id?: string;
    message: string;
    signature?: string;
    timestamp?: number;
};

// Component for rendering individual note cards
const NoteCard = ({ 
    note, 
    editingNote, 
    editTimeLeft, 
    onEditNote 
}: {
    note: Note;
    editingNote: Note | null;
    editTimeLeft: number;
    onEditNote: (note: Note) => void;
}) => {
    const isEditing = editingNote?._id === note._id;
    
    return (
        <div className="mx-4">
            <div 
                data-note-id={note._id}
                className={`bg-white px-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 max-w-sm h-78 w-78 flex flex-col justify-center relative ${
                    isEditing ? 'ring-2 ring-accent-pink' : ''
                }`}
            >
                {isEditing && (
                    <div className="absolute top-2 right-2">
                        <button
                            onClick={() => onEditNote(note)}
                            className="text-xs bg-accent-pink/20 text-accent-pink px-2 py-1 rounded-full hover:bg-accent-pink/30 transition-colors"
                        >
                            Edit ({editTimeLeft}s)
                        </button>
                    </div>
                )}
                <p className="text-gray-800 text-center leading-relaxed mb-4">
                    {note.message}
                </p>
                {note.signature && (
                    <p className="text-gray-600 text-right italic text-sm">
                        - {note.signature}
                    </p>
                )}
            </div>
        </div>
    );
};

// Component for rendering marquee with notes
const NotesMarquee = ({ 
    notes, 
    direction, 
    editingNote, 
    editTimeLeft, 
    onEditNote,
    className = ""
}: {
    notes: Note[];
    direction: "left" | "right";
    editingNote: Note | null;
    editTimeLeft: number;
    onEditNote: (note: Note) => void;
    className?: string;
}) => {
    // Create display notes - either multiply if few notes, or use as-is if many
    const displayNotes = notes.length <= 10 
        ? [...notes, ...notes] 
        : notes;

    return (
        <Marquee
            // linear={true}
            // linearColor="dark-pink"
            // linearWidth={100}
            speed={50}
            pauseOnHover={true}
            className={`h-85 overflow-hidden ${className}`}
            direction={direction}
        >
            {displayNotes.map((note, index) => (
                <NoteCard
                    key={`${direction}-${note._id || `temp-${index}`}-${index}`}
                    note={note}
                    editingNote={editingNote}
                    editTimeLeft={editTimeLeft}
                    onEditNote={onEditNote}
                />
            ))}
        </Marquee>
    );
};

// Hero section component
const HeroSection = () => {
    const heroContent = (
        <div className="text-text text-center font-carattere flex flex-col justify-center items-center">
            <p className="text-lg font-liberty lg:text-3xl text-dark-pink px-4 italic tracking-widest -mt-8 mb-8">
                01 - 07 - 2025
            </p>
            <h1 className="text-5xl leading-tight mb-4">
                Princess Jimisayo
            </h1>
            <div className="text-5xl mb-4">is</div>
            <div className="text-[250px] font-extrabold leading-none text-transparent bg-text bg-clip-text drop-shadow-lg -mt-8 mb-8 font-liberty">
                10!
            </div>
            <p className="text-lg font-liberty lg:text-3xl text-dark-pink px-4 italic">
                Join me in celebrating a wonderful decade full of God's grace, abundance and blessings!
            </p>
        </div>
    );

    return (
        <>
            {/* Mobile Hero */}
            <div className="h-screen flex lg:hidden">
                <div className="h-screen overflow-hidden relative">
                    <img 
                        src={image1} 
                        alt="Birthday celebration" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/80 shadow-inner-dark"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        {heroContent}
                    </div>
                </div>
            </div>

            {/* Desktop Hero */}
            <div className="hidden lg:flex h-screen">
                <div className="w-[50%] flex justify-center items-center px-8">
                    <div className="font-carattere text-center -mb-8">
                        <div className="mb-8">
                            <h1 className="text-5xl lg:text-7xl leading-tight text-text mb-2">
                                Princess Jimisayo
                            </h1>
                            <div className="text-4xl lg:text-9xl text-text mb-4">is</div>
                        </div>
                        <div className="text-[200px] lg:text-[250px] font-bold leading-none text-transparent bg-text border-text bg-clip-text drop-shadow-lg font-liberty -mt-12">
                            10!
                        </div>
                    </div>
                </div>
                <div className="h-screen overflow-hidden w-[50%]">
                    <img src={image1} alt="Birthday celebration" />
                </div>
            </div>
        </>
    );
};

export default function App() {
    const [notes, setNotes] = useState<Note[]>([]);
    // const [downloadableNotes, setDownloadableNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [noteMessage, setNoteMessage] = useState("");
    const [noteSignature, setNoteSignature] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [editTimeLeft, setEditTimeLeft] = useState(0);
    // const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
    // const [pdfProgress, setPdfProgress] = useState(0);
    // const [pdfProgressText, setPdfProgressText] = useState('');
    
    const maxCharacters = 300;

    // Custom hooks for better organization
    const useEditTimer = () => {
        useEffect(() => {
            let timer: NodeJS.Timeout | undefined;
            if (editTimeLeft > 0) {
                timer = setTimeout(() => setEditTimeLeft(editTimeLeft - 1), 1000);
            } else if (editingNote) {
                setEditingNote(null);
            }
            return () => {
                if (timer) clearTimeout(timer);
            };
        }, [editTimeLeft, editingNote]);
    };

    const useScrollToEditingNote = () => {
        useEffect(() => {
            if (editingNote && editTimeLeft > 0) {
                const noteElement = document.querySelector(`[data-note-id="${editingNote._id}"]`);
                if (noteElement) {
                    noteElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center',
                        inline: 'center'
                    });
                }
            }
        }, [editingNote, editTimeLeft]);
    };

    // Use the custom hooks
    useEditTimer();
    useScrollToEditingNote();

    // Fetch notes on component mount
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/notes`); 
                if (!response.ok) {
                    throw new Error("Failed to fetch notes.");
                }
                const data = await response.json();
                setNotes(data);
                // const downloadResponse = await fetch(`${API_BASE}/api/notes/download`); 
                // if (!downloadResponse.ok) {
                //     throw new Error("Failed to fetch notes.");
                // }
                // const downloadData = await downloadResponse.json();
                // setDownloadableNotes(downloadData);
            } catch (error) {
                console.error("Error fetching notes: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    // API functions
    const submitNote = async (message: string, signature: string): Promise<Note> => {
        const response = await fetch(`${API_BASE}/api/notes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, signature })
        });

        if (!response.ok) {
            throw new Error("Failed to submit note");
        }
        return await response.json();
    };

    const updateNote = async (noteId: string, message: string, signature: string): Promise<Note> => {
        const response = await fetch(`${API_BASE}/api/notes/${noteId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, signature })
        });

        if (!response.ok) {
            throw new Error("Failed to update note");
        }
        return await response.json();
    };

    // Utility function to clean text for PDF (remove emojis and special characters)
    // const cleanTextForPdf = (text: string): string => {
    //     // Remove emojis and other Unicode symbols
    //     return text
    //         .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Emoticons
    //         .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Misc Symbols and Pictographs
    //         .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Transport and Map Symbols
    //         .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '') // Flags (iOS)
    //         .replace(/[\u{2600}-\u{26FF}]/gu, '')   // Misc symbols
    //         .replace(/[\u{2700}-\u{27BF}]/gu, '')   // Dingbats
    //         .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') // Supplemental Symbols and Pictographs
    //         .replace(/[\u{1F018}-\u{1F270}]/gu, '') // Various symbols
    //         .replace(/[\u{238C}-\u{2454}]/gu, '')   // Misc symbols
    //         .replace(/[\u{20D0}-\u{20FF}]/gu, '')   // Combining Diacritical Marks for Symbols
    //         .trim()
    //         .replace(/\s+/g, ' '); // Replace multiple spaces with single space
    // };
    // const updateProgress = (percentage: number, text: string) => {
    //     setPdfProgress(percentage);
    //     setPdfProgressText(text);
    //     return new Promise(resolve => setTimeout(resolve, 50)); // Small delay to make progress visible
    // };

    // PDF Download function
    // const handleDownloadNotesPdf = async () => {
    //     if (notes.length === 0) {
    //         alert('No notes available to download.');
    //         return;
    //     }

    //     setIsDownloadingPdf(true);
    //     setPdfProgress(0);
    //     setPdfProgressText('Initializing PDF generation...');

    //     try {
    //         await updateProgress(10, 'Creating PDF document...');
    //         const doc = new jsPDF();
            
    //         await updateProgress(20, 'Setting up document structure...');
            
    //         // Set up colors (RGB values)
    //         const darkPink: [number, number, number] = [139, 69, 119];
    //         const textColor: [number, number, number] = [64, 64, 64];
    //         const lightGray: [number, number, number] = [128, 128, 128];

    //         // Title
    //         doc.setFontSize(24);
    //         doc.setTextColor(darkPink[0], darkPink[1], darkPink[2]);
    //         doc.setFont(undefined, 'bold');
    //         doc.text('Birthday Wishes for Engr. Oladunni Bamidele', 105, 30, { align: 'center' });
            
    //         // Subtitle
    //         doc.setFontSize(14);
    //         doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    //         doc.setFont(undefined, 'normal');
    //         doc.text('40th Birthday Celebration - January 7, 2025', 105, 45, { align: 'center' });
            
    //         // Add a line separator
    //         doc.setDrawColor(darkPink[0], darkPink[1], darkPink[2]);
    //         doc.setLineWidth(0.5);
    //         doc.line(20, 55, 190, 55);

    //         await updateProgress(30, 'Adding header and formatting...');

    //         let yPosition = 75;
    //         const pageHeight = doc.internal.pageSize.height;
    //         const margin = 20;
    //         const bottomMargin = 30;

    //         const totalNotes = notes.length;
    //         let processedNotes = 0;

    //         for (const [index, note] of notes.entries()) {
    //             // Update progress for each batch of notes
    //             if (index % Math.max(1, Math.floor(totalNotes / 10)) === 0) {
    //                 const progressPercent = 30 + Math.floor((processedNotes / totalNotes) * 50);
    //                 await updateProgress(progressPercent, `Processing note ${index + 1} of ${totalNotes}...`);
    //             }

    //             // Check if we need a new page
    //             const estimatedHeight = 40; // Rough estimate for each note
    //             if (yPosition + estimatedHeight > pageHeight - bottomMargin) {
    //                 doc.addPage();
    //                 yPosition = 30;
    //             }

    //             // Note number
    //             doc.setFontSize(12);
    //             doc.setTextColor(darkPink[0], darkPink[1], darkPink[2]);
    //             doc.setFont(undefined, 'bold');
    //             doc.text(`${index + 1}.`, margin, yPosition);

    //             // Note message
    //             doc.setFontSize(11);
    //             doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    //             doc.setFont(undefined, 'normal');
                
    //             // Clean and split text to fit within margins
    //             const cleanedMessage = cleanTextForPdf(note.message);
    //             const messageLines = doc.splitTextToSize(cleanedMessage, 150);
    //             doc.text(messageLines, margin + 10, yPosition);
                
    //             yPosition += messageLines.length * 5;

    //             // Signature
    //             if (note.signature) {
    //                 doc.setFontSize(10);
    //                 doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    //                 doc.setFont(undefined, 'italic');
    //                 const cleanedSignature = cleanTextForPdf(note.signature);
    //                 doc.text(`- ${cleanedSignature}`, margin + 10, yPosition + 5);
    //                 yPosition += 10;
    //             }

    //             // Add some spacing between notes
    //             yPosition += 15;

    //             // Add a subtle line separator every few notes
    //             if ((index + 1) % 3 === 0 && index < notes.length - 1) {
    //                 doc.setDrawColor(200, 200, 200);
    //                 doc.setLineWidth(0.2);
    //                 doc.line(margin, yPosition - 5, 190, yPosition - 5);
    //                 yPosition += 5;
    //             }

    //             processedNotes++;
    //         }

    //         await updateProgress(85, 'Adding page numbers and footers...');

    //         // Add footer on last page
    //         const totalPages = doc.internal.getNumberOfPages();
    //         for (let i = 1; i <= totalPages; i++) {
    //             doc.setPage(i);
    //             doc.setFontSize(8);
    //             doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    //             doc.text(`Generated on ${new Date().toLocaleDateString()} | Page ${i} of ${totalPages}`, 105, pageHeight - 10, { align: 'center' });
    //         }

    //         await updateProgress(95, 'Finalizing PDF...');

    //         // Save the PDF
    //         const fileName = `Oladunni_Bamidele_40th_Birthday_Wishes_${new Date().toISOString().split('T')[0]}.pdf`;
            
    //         await updateProgress(100, 'Download starting...');
            
    //         // Small delay to show 100% completion
    //         await new Promise(resolve => setTimeout(resolve, 500));
            
    //         doc.save(fileName);

    //     } catch (error) {
    //         console.error('Error generating PDF:', error);
    //         alert('There was an error generating the PDF. Please try again.');
    //     } finally {
    //         setIsDownloadingPdf(false);
    //         setPdfProgress(0);
    //         setPdfProgressText('');
    //     }
    // };

    // Event handlers
    const handleSubmitNote = async () => {
        if (!noteMessage.trim()) return;

        setIsSubmitting(true);
        try {
            if (editingNote) {
                const updatedNote = await updateNote(editingNote._id!, noteMessage, noteSignature);
                setNotes(prev => prev.map(note => 
                    note._id === editingNote._id ? updatedNote : note
                ));
                setEditingNote(null);
                setEditTimeLeft(0);
            } else {
                const newNote = await submitNote(noteMessage, noteSignature);
                setNotes(prev => [...prev, newNote]);
                setEditingNote(newNote);
                setEditTimeLeft(60);
            }
            
            setShowNoteModal(false);
            setNoteMessage("");
            setNoteSignature("");
        } catch (error) {
            console.error("Error submitting note:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditNote = (note: Note) => {
        setEditingNote(note);
        setNoteMessage(note.message);
        setNoteSignature(note.signature || "");
        setShowNoteModal(true);
    };

    const handleDownloadPictures = () => {
        window.open("https://drive.google.com/drive/u/0/folders/1s6GqzLiSRQd7QuJWR3pwXSBZ0WlW8-A4", "_blank");
    };

    const handleAddNote = () => {
        setNoteMessage("");
        setNoteSignature("");
        setEditingNote(null);
        setShowNoteModal(true);
    };

    const closeModal = () => setShowNoteModal(false);
    const closeContactModal = () => setShowContactModal(false);
    const openContactModal = () => setShowContactModal(true);

    const handleContactClick = (type: string, value: string) => {
        switch (type) {
            case 'email':
                window.open(`mailto:${value}`, '_blank');
                break;
            case 'phone':
                window.open(`tel:${value}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://wa.me/${value}`, '_blank');
                break;
            case 'website':
                window.open(value, '_blank');
                break;
            default:
                break;
        }
    };

    if (loading) return null;

    return (
        <div className="font-liberty bg-light-pink min-h-screen">
            <HeroSection />

            {/* Gallery Section */}
            <div className="lg:min-h-screen bg-white flex flex-col gap-2 py-8 lg:py-8 justify-center items-center">
                <h1 className="font-carattere text-4xl px-4 text-center lg:text-6xl text-transparent bg-linear-to-br from-text via-accent-pink to-text bg-clip-text drop-shadow-lg leading-12 lg:leading-20 mb-4">
                    Double digits, double the fun!
                </h1>

                <Marquee
                    // linear={false}
                    speed={80}
                    pauseOnHover={true}
                    className="mt-2 lg:h-85 mb-4 flex flex-col justify-center items-center overflow-hidden"
                >
                    {marqueeImages.map((src, index) => (
                        <div key={`gallery-${index}`} className="mx-4">
                            <img
                                src={src}
                                alt={`Gallery image ${index + 1}`}
                                className="h-80 w-auto rounded-lg shadow-lg lg:shadow-none hover:scale-105 hover:rounded-lg transition-transform duration-300"
                            />
                        </div>
                    ))}
                </Marquee>

                <button
                    onClick={handleDownloadPictures}
                    className="mt-8 lg:mt-2 px-8 py-4 bg-text text-light-pink font-liberty font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                    📸 Download Pictures
                </button>
            </div>

            {/* Notes Section */}
            <div className="min-h-screen flex flex-col py-8 lg:py-12 justify-center items-center">
                <h1 className="font-carattere text-4xl px-4 text-center lg:text-6xl text-transparent bg-linear-to-br from-text via-accent-pink to-text bg-clip-text drop-shadow-lg leading-12 lg:leading-20">
                    Well Wishes from Family & Friends
                </h1>

                <NotesMarquee
                    notes={notes}
                    direction="right"
                    editingNote={editingNote}
                    editTimeLeft={editTimeLeft}
                    onEditNote={handleEditNote}
                    className="mt-2"
                />

                <NotesMarquee
                    notes={notes}
                    direction="left"
                    editingNote={editingNote}
                    editTimeLeft={editTimeLeft}
                    onEditNote={handleEditNote}
                    className=""
                />

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <button
                        onClick={handleAddNote}
                        className="px-8 py-4 bg-text text-light-pink font-liberty font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                        💌 Leave a Note
                    </button>
                    
                    {/* <button
                        onClick={handleDownloadNotesPdf}
                        disabled={isDownloadingPdf || notes.length === 0}
                        className="px-8 py-4 bg-linear-to-r from-accent-pink to-text text-light-pink font-liberty font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 relative overflow-hidden"
                    >
                        {isDownloadingPdf && (
                            <>
                                <div className="absolute inset-0 bg-black/10 rounded-full"></div>
                                <div 
                                    className="absolute left-0 top-0 h-full bg-white/20 rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${pdfProgress}%` }}
                                ></div>
                            </>
                        )}
                        <Download className="h-4 w-4 relative z-10" />
                        <span className="relative z-10">
                            {isDownloadingPdf 
                                ? (
                                    <span className="flex flex-col items-center">
                                        <span className="text-sm">{Math.round(pdfProgress)}%</span>
                                        <span className="text-xs opacity-90">{pdfProgressText}</span>
                                    </span>
                                ) 
                                : '📄 Download All Notes'
                            }
                        </span>
                    </button> */}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-text text-light-pink w-full flex justify-center items-center h-20">
                <p>Made with</p> 
                <Heart className="h-4 w-4 mx-1" /> 
                <p>by</p>
                <button
                    onClick={openContactModal}
                    className="ml-1 text-light-pink hover:text-accent-pink underline underline-offset-2 hover:underline-offset-4 transition-all duration-200 font-medium"
                >
                    Ifeoluwa Folami
                </button>
            </div>

            {/* Note Modal */}
            {showNoteModal && (
                <ModalFrame onClose={closeModal} open={showNoteModal}>
                    <ModalHead>
                        {editingNote ? 'Edit Your Note' : 'Leave a Note for the Celebrant'}
                    </ModalHead>
                    <ModalBody>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Message *
                                </label>
                                <textarea
                                    id="message"
                                    value={noteMessage}
                                    onChange={(e) => {
                                        if (e.target.value.length <= maxCharacters) {
                                            setNoteMessage(e.target.value);
                                        }
                                    }}
                                    placeholder="Share your birthday wishes and kind words for the celebrant!"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-pink focus:border-transparent resize-none"
                                    rows={4}
                                    required
                                />
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-gray-500">
                                        {noteMessage.length}/{maxCharacters} characters
                                    </span>
                                    {editingNote && (
                                        <span className="text-xs text-accent-pink font-medium">
                                            Edit time remaining: {editTimeLeft}s
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Name *
                                </label>
                                <input
                                    id="signature"
                                    type="text"
                                    value={noteSignature}
                                    onChange={(e) => setNoteSignature(e.target.value)}
                                    placeholder="Name/Nickname"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-pink focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            onClick={closeModal}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmitNote}
                            disabled={(!noteMessage.trim() || !noteSignature.trim()) || isSubmitting}
                            className="px-6 py-2 bg-linear-to-r from-text to-accent-pink text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isSubmitting ? (editingNote ? 'Updating...' : 'Submitting...') : (editingNote ? 'Update Note' : 'Submit Note')}
                        </button>
                    </ModalFooter>
                </ModalFrame>
            )}

            {/* Contact Modal */}
            {showContactModal && (
                <ModalFrame onClose={closeContactModal} open={showContactModal}>
                    <ModalHead>
                        Contact Developer
                    </ModalHead>
                    <ModalBody>
                        <div className="space-y-6">
                            <div className="text-start">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Ifeoluwa Folami</h3>
                                <p className="text-gray-600 mb-4">Full Stack Developer</p>
                            </div>
                            
                            <div className="space-y-4">
                                <button
                                    onClick={() => handleContactClick('email', 'folamihephzibah@gmail.com')}
                                    className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                                >
                                    <Mail className="h-5 w-5 text-gray-600 group-hover:text-accent-pink transition-colors" />
                                    <div className="text-left">
                                        <p className="font-medium text-gray-800">Email</p>
                                        <p className="text-sm text-gray-600">folamihephzibah@gmail.com</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleContactClick('whatsapp', '+2348138041811')}
                                    className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                                >
                                    <MessageCircle className="h-5 w-5 text-gray-600 group-hover:text-accent-pink transition-colors" />
                                    <div className="text-left">
                                        <p className="font-medium text-gray-800">WhatsApp</p>
                                        <p className="text-sm text-gray-600">Send a message</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleContactClick('website', 'https://www.linkedin.com/in/ifeoluwafolami')}
                                    className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                                >
                                    <Globe className="h-5 w-5 text-gray-600 group-hover:text-accent-pink transition-colors" />
                                    <div className="text-left">
                                        <p className="font-medium text-gray-800">LinkedIn</p>
                                        <p className="text-sm text-gray-600">www.linkedin.com/in/ifeoluwafolami</p>
                                    </div>
                                </button>
                            </div>

                            <div className="text-center pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-500">
                                    Available for freelance projects and collaborations
                                </p>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            onClick={closeContactModal}
                            className="px-6 py-2 bg-text text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Close
                        </button>
                    </ModalFooter>
                </ModalFrame>
            )}
        </div>
    );
}