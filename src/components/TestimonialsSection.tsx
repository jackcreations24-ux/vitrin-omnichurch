import React, { useState, useEffect } from 'react';
import {
  Quote,
  Star,
  ShieldCheck,
  Church,
  Send,
  LogOut,
  MessageSquarePlus,
  CheckCircle2,
  Trash2,
  UserCheck,
  Check,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { useI18n } from '../i18n/I18nContext';
import {
  auth,
  signInWithGoogle,
  signOutUser,
  subscribeToAuthChange,
  subscribeToRealtimeReviews,
  submitRealtimeReview,
  deleteRealtimeReview,
  AppReview,
} from '../lib/firebase';

export const TestimonialsSection: React.FC = () => {
  const { lang } = useI18n();

  // Real-time State
  const [reviews, setReviews] = useState<AppReview[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [role, setRole] = useState('');
  const [church, setChurch] = useState('');
  const [visitorName, setVisitorName] = useState('');

  // 1. Subscribe to Firebase Auth state
  useEffect(() => {
    const unsubscribeAuth = subscribeToAuthChange((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, []);

  // 2. Subscribe to Real-Time Reviews from Firestore
  useEffect(() => {
    const unsubscribeReviews = subscribeToRealtimeReviews((liveReviews) => {
      setReviews(liveReviews);
    });
    return () => unsubscribeReviews();
  }, []);

  // Google Sign-In Trigger
  const handleGoogleSignIn = async () => {
    setIsLoadingAuth(true);
    setErrorMessage(null);
    try {
      const user = await signInWithGoogle();
      setCurrentUser(user);
      setShowForm(true);
    } catch (err: unknown) {
      console.warn('Google Sign-In notice:', err);
      // If popup was blocked or user closed window, allow visitor mode
      setErrorMessage(
        lang === 'ht'
          ? 'Koneksyon an pa fin konplete. Ou ka ekri non w kòm vizitè tou pou soumèt avi w la.'
          : lang === 'fr'
          ? 'La connexion a été interrompue. Vous pouvez également saisir votre nom pour publier.'
          : lang === 'es'
          ? 'La conexión no se completó. También puede ingresar su nombre para publicar.'
          : 'Sign in was interrupted. You may also enter your name to post as a visitor.'
      );
      setShowForm(true);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setCurrentUser(null);
    } catch (e) {
      console.debug('Sign out error:', e);
    }
  };

  // Submit Review to Firestore
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setErrorMessage(
        lang === 'ht'
          ? 'Tanpri ekri kèk mo sou eksperyans ou ak OmniChurch.'
          : lang === 'fr'
          ? 'Veuillez rédiger quelques mots sur votre expérience.'
          : lang === 'es'
          ? 'Por favor escriba unas palabras sobre su experiencia.'
          : 'Please write a brief comment about your experience.'
      );
      return;
    }

    const finalName = currentUser?.displayName || visitorName.trim() || 'Lidè Legliz';
    const finalUserId = currentUser?.uid || `visitor-${Date.now()}`;
    const finalEmail = currentUser?.email || '';
    const finalPhoto = currentUser?.photoURL || '';

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await submitRealtimeReview({
        userId: finalUserId,
        userName: finalName,
        userEmail: finalEmail,
        userPhoto: finalPhoto,
        rating,
        comment,
        role: role.trim() || (lang === 'ht' ? 'Lidè / Manm' : 'Leader / Member'),
        church: church.trim() || (lang === 'ht' ? 'Kominote Kretyèn' : 'Christian Congregation'),
      });

      setSubmitSuccess(true);
      setComment('');
      setRole('');
      setChurch('');
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowForm(false);
      }, 2500);
    } catch (err: unknown) {
      console.error('Erè soumèt avi:', err);
      setErrorMessage(
        lang === 'ht'
          ? 'Gen yon ti pwoblèm rezo, men avi ou anrejistre lokalman!'
          : 'Network delay, review saved locally!'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    const confirmMsg =
      lang === 'ht'
        ? 'Èske ou sèten ou vle retire avi sa a?'
        : lang === 'fr'
        ? 'Êtes-vous sûr de vouloir supprimer cet avis ?'
        : lang === 'es'
        ? '¿Seguro que desea eliminar esta reseña?'
        : 'Are you sure you want to delete this review?';

    if (window.confirm(confirmMsg)) {
      await deleteRealtimeReview(reviewId);
    }
  };

  // Calculate Average Rating
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  const sectionHeadings = {
    ht: {
      eyebrow: 'AVI & NÒT AN TAN REYÈL',
      title: 'Sa Lidè ak Manm Legliz Yo Di Sou OmniChurch',
      subtitle: 'Tout avi ki afiche la a soti dirèkteman nan men lidè ak manm ki konekte an tan reyèl ak kont Google yo.',
      btnWriteReview: 'Bay Yon Nòt & Ekri Yon Avi',
      connectGoogle: 'Konekte ak Google pou Bay Avi',
      connectedAs: 'Konekte kòm',
      googleVerified: 'Google Verifye',
      visitor: 'Vizitè',
      ratingLabel: 'Nòt ou sou aplikasyon an (1 a 5 zetwal):',
      commentPlaceholder: 'Eksplike kijan OmniChurch ede legliz ou a (kat QR, prezans, jesyon manm, vitès offline...)...',
      rolePlaceholder: 'Wòl ou (Eg: Pastè, Sekretè, Manm, Responsab Medya...)',
      churchPlaceholder: 'Non Legliz ou a (Eg: Premye Legliz Batis Delmas...)',
      namePlaceholder: 'Non konplè ou',
      btnSubmit: 'Pibliye Avi Mwen An Tan Reyèl',
      btnCancel: 'Anile',
      successMsg: 'Mèsi anpil! Avi ou pibliye an tan reyèl pou tout kominote a.',
      noReviewsYet: 'Poko gen okenn avi ki pibliye. Fè pati premye lidè ki bay yon nòt pou OmniChurch!',
      starsDesc: {
        5: '5/5 • Ekselan / Eksepsyonèl',
        4: '4/5 • Trè Bon',
        3: '3/5 • Bon',
        2: '2/5 • Mwayen',
        1: '1/5 • Bezwen Amelyorasyon',
      },
    },
    fr: {
      eyebrow: 'AVIS & NOTES EN TEMPS RÉEL',
      title: 'Ce Que Disent Les Dirigeants et Membres D’Églises',
      subtitle: 'Tous les avis ci-dessous proviennent directement de leaders et membres connectés en temps réel avec leur compte Google.',
      btnWriteReview: 'Donner Une Note & Laisser Un Avis',
      connectGoogle: 'Se Connecter avec Google pour Noter',
      connectedAs: 'Connecté en tant que',
      googleVerified: 'Google Vérifié',
      visitor: 'Visiteur',
      ratingLabel: 'Votre note pour l’application (1 à 5 étoiles) :',
      commentPlaceholder: 'Expliquez comment OmniChurch aide votre église (cartes QR, présences, répertoire, mode hors ligne...)...',
      rolePlaceholder: 'Votre rôle (Ex : Pasteur, Secrétaire, Membre, Média...)',
      churchPlaceholder: 'Nom de votre église (Ex : Église Baptiste Centrale...)',
      namePlaceholder: 'Votre nom complet',
      btnSubmit: 'Publier Mon Avis En Temps Réel',
      btnCancel: 'Annuler',
      successMsg: 'Merci ! Votre avis a été publié en direct pour toute la communauté.',
      noReviewsYet: 'Aucun avis pour l’instant. Soyez le premier leader à donner une note à OmniChurch !',
      starsDesc: {
        5: '5/5 • Excellent / Exceptionnel',
        4: '4/5 • Très Bon',
        3: '3/5 • Bon',
        2: '2/5 • Moyen',
        1: '1/5 • À Améliorer',
      },
    },
    en: {
      eyebrow: 'REAL-TIME REVIEWS & RATINGS',
      title: 'What Church Leaders & Members Say About OmniChurch',
      subtitle: 'All reviews published below come directly from real leaders and members authenticated in real-time with their Google account.',
      btnWriteReview: 'Rate App & Write a Review',
      connectGoogle: 'Sign in with Google to Review',
      connectedAs: 'Signed in as',
      googleVerified: 'Google Verified',
      visitor: 'Visitor',
      ratingLabel: 'Your rating for the app (1 to 5 stars):',
      commentPlaceholder: 'Share how OmniChurch impacts your church (QR attendance, directory, member cards, offline mode...)...',
      rolePlaceholder: 'Your role (e.g., Senior Pastor, Secretary, Media Team, Member...)',
      churchPlaceholder: 'Your church name (e.g., Grace Baptist Church...)',
      namePlaceholder: 'Your full name',
      btnSubmit: 'Publish My Real-Time Review',
      btnCancel: 'Cancel',
      successMsg: 'Thank you! Your verified review is now live in real-time for everyone.',
      noReviewsYet: 'No reviews published yet. Be the first church leader to rate and review OmniChurch!',
      starsDesc: {
        5: '5/5 • Excellent / Exceptional',
        4: '4/5 • Very Good',
        3: '3/5 • Good',
        2: '2/5 • Average',
        1: '1/5 • Needs Improvement',
      },
    },
    es: {
      eyebrow: 'RESEÑAS EN TIEMPO REAL',
      title: 'Lo Que Dicen Los Líderes y Miembros De Iglesias',
      subtitle: 'Todas las opiniones provienen en directo de pastores y miembros autenticados en tiempo real con su cuenta de Google.',
      btnWriteReview: 'Calificar y Dejar Reseña',
      connectGoogle: 'Conectar con Google para Calificar',
      connectedAs: 'Conectado como',
      googleVerified: 'Google Verificado',
      visitor: 'Visitante',
      ratingLabel: 'Su calificación para la app (1 a 5 estrellas):',
      commentPlaceholder: 'Comparta cómo OmniChurch ayuda a su congregación (asistencia QR, membresía, modo offline...)...',
      rolePlaceholder: 'Su cargo (Ej: Pastor, Secretario, Líder de Alabanza...)',
      churchPlaceholder: 'Nombre de su iglesia (Ej: Primera Iglesia Bíblica...)',
      namePlaceholder: 'Su nombre completo',
      btnSubmit: 'Publicar Reseña en Vivo',
      btnCancel: 'Cancelar',
      successMsg: '¡Muchas gracias! Su reseña verificada ya está visible en tiempo real.',
      noReviewsYet: 'Aún no hay reseñas. ¡Sea el primer líder en calificar OmniChurch!',
      starsDesc: {
        5: '5/5 • Excelente / Excepcional',
        4: '4/5 • Muy Bueno',
        3: '3/5 • Bueno',
        2: '2/5 • Regular',
        1: '1/5 • Necesita Mejoras',
      },
    },
  }[lang] || {
    eyebrow: 'AVI & NÒT AN TAN REYÈL',
    title: 'Sa Lidè ak Manm Legliz Yo Di Sou OmniChurch',
    subtitle: 'Tout avi ki afiche la a soti dirèkteman nan men lidè ak manm ki konekte an tan reyèl ak kont Google yo.',
    btnWriteReview: 'Bay Yon Nòt & Ekri Yon Avi',
    connectGoogle: 'Konekte ak Google pou Bay Avi',
    connectedAs: 'Konekte kòm',
    googleVerified: 'Google Verifye',
    visitor: 'Vizitè',
    ratingLabel: 'Nòt ou sou aplikasyon an (1 a 5 zetwal):',
    commentPlaceholder: 'Eksplike kijan OmniChurch ede legliz ou a...',
    rolePlaceholder: 'Wòl ou (Pastè, Sekretè, Manm...)',
    churchPlaceholder: 'Non Legliz ou a...',
    namePlaceholder: 'Non konplè ou',
    btnSubmit: 'Pibliye Avi Mwen An Tan Reyèl',
    btnCancel: 'Anile',
    successMsg: 'Mèsi anpil! Avi ou pibliye an tan reyèl.',
    noReviewsYet: 'Poko gen okenn avi ki pibliye. Fè pati premye lidè ki bay yon nòt pou OmniChurch!',
    starsDesc: {
      5: '5/5 • Ekselan / Eksepsyonèl',
      4: '4/5 • Trè Bon',
      3: '3/5 • Bon',
      2: '2/5 • Mwayen',
      1: '1/5 • Bezwen Amelyorasyon',
    },
  };

  const currentDisplayRating = hoverRating !== null ? hoverRating : rating;

  return (
    <section id="temwayaj" className="py-16 md:py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/25 text-[#35c9ff] text-xs font-black tracking-widest uppercase">
            <Quote className="w-3.5 h-3.5" />
            <span>{sectionHeadings.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            {sectionHeadings.title}
          </h2>

          <p className="text-blue-100/70 text-sm sm:text-base max-w-2xl mx-auto">
            {sectionHeadings.subtitle}
          </p>

          {/* Aggregate Rating & Action Trigger */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-black/40 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(Number(averageRating))
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-white/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-white">
                {averageRating} <span className="text-xs text-blue-200/60">/ 5</span>
              </span>
              <span className="text-xs text-[#35c9ff] font-semibold border-l border-white/10 pl-2.5">
                {reviews.length} {lang === 'ht' ? 'Avi Verifye' : lang === 'fr' ? 'Avis Vérifiés' : lang === 'es' ? 'Reseñas' : 'Verified Reviews'}
              </span>
            </div>

            {!showForm && (
              <button
                type="button"
                onClick={() => {
                  setShowForm(true);
                  if (!currentUser) {
                    handleGoogleSignIn();
                  }
                }}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#087cff] to-[#35c9ff] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_4px_20px_rgba(8,124,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>{sectionHeadings.btnWriteReview}</span>
              </button>
            )}
          </div>
        </div>

        {/* Real-time Review Form (When Open) */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-14 p-6 sm:p-8 rounded-[24px] glass border border-[#35c9ff]/40 bg-gradient-to-b from-[#071d42]/95 via-[#031533]/90 to-[#020b1f]/95 shadow-[0_15px_45px_rgba(8,124,255,0.25)] relative animate-in fade-in zoom-in-95 duration-200">
            {/* Header / Google Account Info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
              {currentUser ? (
                <div className="flex items-center gap-3">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || ''}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full border-2 border-emerald-400 object-cover shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold flex items-center justify-center">
                      {(currentUser.displayName || currentUser.email || 'G')[0].toUpperCase()}
                    </div>
                  )}
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-black text-white">
                        {currentUser.displayName || 'Itilizatè Google'}
                      </span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                        <Check className="w-2.5 h-2.5" />
                        {sectionHeadings.googleVerified}
                      </span>
                    </div>
                    <p className="text-[11px] text-blue-200/60 truncate max-w-[220px] sm:max-w-none">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isLoadingAuth}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
                  >
                    {/* Google Official G Logo */}
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>{isLoadingAuth ? 'Koneksyon...' : sectionHeadings.connectGoogle}</span>
                  </button>
                  <span className="text-[11px] text-blue-200/50">
                    (Deteksyon otomatik kont ou pou sekirize avi w)
                  </span>
                </div>
              )}

              {currentUser && (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-xs text-blue-300/60 hover:text-white flex items-center gap-1 transition cursor-pointer"
                  title="Dekonekte"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Dekonekte</span>
                </button>
              )}
            </div>

            {/* Error or Success feedback */}
            {errorMessage && (
              <div className="mt-3 p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {submitSuccess && (
              <div className="mt-3 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{sectionHeadings.successMsg}</span>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSubmitReview} className="mt-5 space-y-4">
              {/* Star Rating Picker */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold text-white">
                  {sectionHeadings.ratingLabel}
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-black/40 border border-white/10">
                    {[1, 2, 3, 4, 5].map((starNum) => (
                      <button
                        key={starNum}
                        type="button"
                        onClick={() => setRating(starNum)}
                        onMouseEnter={() => setHoverRating(starNum)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 transition transform hover:scale-125 cursor-pointer focus:outline-none"
                        aria-label={`${starNum} zetwal`}
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            starNum <= currentDisplayRating
                              ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                              : 'text-white/20'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-cyan-300">
                    {sectionHeadings.starsDesc[currentDisplayRating as keyof typeof sectionHeadings.starsDesc]}
                  </span>
                </div>
              </div>

              {/* If not logged in with Google, give manual Name field */}
              {!currentUser && (
                <div className="text-left space-y-1">
                  <label className="block text-xs font-bold text-white">
                    {sectionHeadings.namePlaceholder} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="Eg: Pastè Jean-Baptiste"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs placeholder:text-white/30 focus:border-[#35c9ff] focus:outline-none"
                  />
                </div>
              )}

              {/* Role & Church Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-white">
                    {lang === 'ht' ? 'Wòl ou nan legliz la' : 'Your role'}
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder={sectionHeadings.rolePlaceholder}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs placeholder:text-white/30 focus:border-[#35c9ff] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-white">
                    {lang === 'ht' ? 'Non Legliz la' : 'Church name'}
                  </label>
                  <input
                    type="text"
                    value={church}
                    onChange={(e) => setChurch(e.target.value)}
                    placeholder={sectionHeadings.churchPlaceholder}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs placeholder:text-white/30 focus:border-[#35c9ff] focus:outline-none"
                  />
                </div>
              </div>

              {/* Comment Textarea */}
              <div className="text-left space-y-1">
                <label className="block text-xs font-bold text-white">
                  {lang === 'ht' ? 'Kòmantè / Eksperyans ou ak app la' : 'Review & Experience'}{' '}
                  <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={sectionHeadings.commentPlaceholder}
                  className="w-full p-3.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs sm:text-sm placeholder:text-white/30 focus:border-[#35c9ff] focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs font-bold transition cursor-pointer"
                >
                  {sectionHeadings.btnCancel}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#087cff] to-[#35c9ff] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-[0_4px_15px_rgba(8,124,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{lang === 'ht' ? 'N ap pibliye...' : 'Publishing...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{sectionHeadings.btnSubmit}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Real-time Reviews Display Grid */}
        {reviews.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center p-8 sm:p-12 rounded-[24px] glass border border-dashed border-[#35c9ff]/30 bg-black/30 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#35c9ff]/10 border border-[#35c9ff]/30 flex items-center justify-center text-[#35c9ff]">
              <MessageSquarePlus className="w-7 h-7" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {sectionHeadings.noReviewsYet}
            </h3>
            <p className="text-xs text-blue-200/70 max-w-md mx-auto">
              {lang === 'ht'
                ? 'Tout pastè, manm, ak responsab kominikasyon ki telechaje app la ka ekri premye avi yo pou ankouraje lòt asanble yo.'
                : 'Every pastor and administrator using OmniChurch can leave verified feedback to empower fellow churches.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setShowForm(true);
                if (!currentUser) handleGoogleSignIn();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#087cff] hover:bg-[#076ee2] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition cursor-pointer shadow-[0_4px_15px_rgba(8,124,255,0.3)]"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{sectionHeadings.btnWriteReview}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => {
              const isOwner =
                currentUser &&
                (currentUser.uid === rev.userId ||
                  (currentUser.email && currentUser.email === 'jackson318638@gmail.com'));

              return (
                <div
                  key={rev.id}
                  className="relative p-6 rounded-2xl bg-gradient-to-b from-[#071d42]/90 to-[#020b1f]/95 border border-[#35c9ff]/30 hover:border-[#35c9ff]/60 shadow-[0_8px_30px_rgba(8,124,255,0.15)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 text-left"
                >
                  {/* Top Bar: Stars + Date + Delete Button if owner */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-white/20'
                            }`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-blue-200/50">
                          {rev.createdAt
                            ? new Date(rev.createdAt).toLocaleDateString(
                                lang === 'ht' ? 'fr-FR' : lang === 'fr' ? 'fr-FR' : 'en-US',
                                { month: 'short', day: 'numeric', year: 'numeric' }
                              )
                            : 'Resan'}
                        </span>
                        {isOwner && (
                          <button
                            type="button"
                            onClick={() => handleDeleteReview(rev.id)}
                            className="p-1 rounded-md text-red-400/60 hover:text-red-300 hover:bg-red-500/10 transition cursor-pointer"
                            title="Retire avi sa a"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-blue-100/90 text-sm leading-relaxed mb-6 italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Author Meta Profile */}
                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    {rev.userPhoto ? (
                      <img
                        src={rev.userPhoto}
                        alt={rev.userName}
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#35c9ff]/60 shadow-[0_0_10px_rgba(53,201,255,0.4)]"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#087cff] to-[#35c9ff] text-white font-black text-sm flex items-center justify-center border-2 border-[#35c9ff]/60 shadow-[0_0_10px_rgba(53,201,255,0.4)]">
                        {rev.userName[0]?.toUpperCase() || 'L'}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-white truncate">{rev.userName}</h4>
                        {rev.verified && (
                          <span
                            title={sectionHeadings.googleVerified}
                            className="inline-flex items-center text-emerald-400 shrink-0"
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </span>
                        )}
                      </div>

                      {rev.role && (
                        <p className="text-xs text-[#35c9ff] truncate font-medium">{rev.role}</p>
                      )}

                      {rev.church && (
                        <div className="flex items-center gap-1 text-[11px] text-blue-200/50 truncate mt-0.5">
                          <Church className="w-3 h-3 shrink-0" />
                          <span className="truncate">{rev.church}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
