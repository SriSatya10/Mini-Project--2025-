// sync-service.js — Auto-sync localStorage data to the TheraBot backend
// Add this script to any HTML page: <script src="sync-service.js"></script>
// It intercepts localStorage writes and mirrors them to the PostgreSQL database.

(function () {
    'use strict';

    const API_BASE = 'http://localhost:3000/api';

    // Helper: POST data to backend (fire-and-forget)
    function syncToBackend(endpoint, data) {
        fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            console.log(`[Sync] ✅ Synced to ${endpoint}`);
        })
        .catch(err => {
            console.warn(`[Sync] ⚠️ Failed to sync to ${endpoint}:`, err.message);
        });
    }

    // Get the current user UID from localStorage
    function getCurrentUid() {
        return localStorage.getItem('userUid');
    }

    // Override localStorage.setItem to intercept writes
    const originalSetItem = Storage.prototype.setItem;

    Storage.prototype.setItem = function (key, value) {
        // Call the original setItem first so localStorage works as normal
        originalSetItem.call(this, key, value);

        // Only intercept writes to localStorage (not sessionStorage)
        if (this !== localStorage) return;

        const uid = getCurrentUid();

        // Route data to the correct backend endpoint based on the key
        try {
            // 1. User UID stored after login/signup
            if (key === 'userUid') {
                syncToBackend('/users', { uid: value });
            }

            // 2. Nickname (from name.html — saved by various means)
            // We detect nickname saves by checking common patterns
            if (key === 'nickname' || key === 'user_nickname') {
                if (uid) {
                    syncToBackend('/users', { uid, nickname: value });
                }
            }

            // 3. Age group
            if (key === 'ageGroup' || key === 'user_age_group') {
                if (uid) {
                    syncToBackend('/users', { uid, ageGroup: value });
                }
            }

            // 4. Zone challenges (from zone2.html)
            if (key === 'zone_challenges' || key === 'selected_challenges') {
                if (uid) {
                    try {
                        const challenges = JSON.parse(value);
                        syncToBackend('/users', { uid, zoneChallenges: challenges });
                    } catch (e) {
                        syncToBackend('/users', { uid, zoneChallenges: [value] });
                    }
                }
            }

            // 5. User answers from chatbot assessment
            if (key === 'user_answers' || (uid && key === `user_answers_${uid}`)) {
                try {
                    const answers = JSON.parse(value);
                    syncToBackend('/assessments', { uid, answers });
                } catch (e) { /* ignore parse errors */ }
            }

            // 6. Assessment scores (category-specific)
            if (key === 'assessment_scores') {
                if (uid) {
                    try {
                        const scores = JSON.parse(value);
                        syncToBackend('/assessments', {
                            uid,
                            sadScore: scores['SAD'] || scores['SAD (Social Anxiety Disorder)'] || 0,
                            pddScore: scores['PDD'] || scores['PDD (Persistent Depressive Disorder)'] || 0,
                            ocdScore: scores['OCD'] || scores['OCD (Obsessive-Compulsive Disorder)'] || 0,
                            ptsdScore: scores['PTSD'] || scores['PTSD (Post-Traumatic Stress Disorder)'] || 0,
                            highestCategory: scores.highest || null,
                            answers: scores.answers || [],
                        });
                    } catch (e) { /* ignore */ }
                }
            }

            // 7. Advanced assessment scores (ocdScore, sadScore, ptsdScore, pddScore)
            if (key === 'ocdScore' || key === 'sadScore' || key === 'ptsdScore' || key === 'pddScore') {
                if (uid) {
                    const typeMap = {
                        ocdScore: 'OCD',
                        sadScore: 'SAD',
                        ptsdScore: 'PTSD',
                        pddScore: 'PDD',
                    };
                    syncToBackend('/advanced-assessments', {
                        uid,
                        disorderType: typeMap[key],
                        score: parseInt(value) || 0,
                    });
                }
            }

            // 8. Chat history (multiple key patterns used across the project)
            if (key.startsWith('chatHistory_') || key.startsWith('therabot_chat_history')) {
                const chatUid = uid || key.split('_').pop();
                if (chatUid) {
                    try {
                        const messages = JSON.parse(value);
                        syncToBackend('/chat-history', {
                            uid: chatUid,
                            sessionId: `session_${Date.now()}`,
                            messages: Array.isArray(messages) ? messages : [{ text: value }],
                        });
                    } catch (e) {
                        syncToBackend('/chat-history', {
                            uid: chatUid,
                            sessionId: `session_${Date.now()}`,
                            messages: [{ text: value, timestamp: new Date().toISOString() }],
                        });
                    }
                }
            }

        } catch (err) {
            console.warn('[Sync] Error processing key "' + key + '":', err.message);
        }
    };

    console.log('[Sync] 🔄 TheraBot sync service loaded — localStorage writes will be mirrored to the database.');
})();
