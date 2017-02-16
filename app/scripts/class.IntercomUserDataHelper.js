'use strict';

let IntercomUserDataHelper = {

    /**
     * Used to sync certain properties from the auth0 profile data to intercom so that it is available
     * for segmentation and when communicating with users via intercom
     * @param profile
     */
    intercomUserDataFromAuth0ProfileData: function (profile) {

        var created_at = new Date(profile.created_at);
        var last_login_at = new Date();
        var intercom_data = {
            app_id: env.INTERCOM_ID,
            user_id: profile.user_id,
            name: profile.name,
            email: profile.email,
            created_at: Math.floor(created_at / 1000),
            "picture": profile.picture,
            "signup_plan": profile.user_metadata.signup_plan,
            "original_mixpanel_distinct_id": profile.user_metadata.original_mixpanel_distinct_id,
            "auth0_user_id": profile.user_id,
            "auth0_updated_at": profile.updated_at,
            "auth0_given_name": profile.given_name,
            "auth0_family_name": profile.family_name,
            "auth0_last_login_at": last_login_at,
            "auth0_email_verified": profile.email_verified
        };

        // Store most data in app-specific data for multi-app tracking/detection/segmentation
        intercom_data[env.INTERCOM_APP_TAG + '_original_mixpanel_distinct_id'] = intercom_data.original_mixpanel_distinct_id;
        intercom_data[env.INTERCOM_APP_TAG + '_auth0_user_id'] = intercom_data.auth0_user_id;
        intercom_data[env.INTERCOM_APP_TAG + '_auth0_updated_at'] = intercom_data.auth0_updated_at;
        intercom_data[env.INTERCOM_APP_TAG + '_auth0_given_name'] = intercom_data.auth0_given_name;
        intercom_data[env.INTERCOM_APP_TAG + '_auth0_family_name'] = intercom_data.auth0_family_name;
        intercom_data[env.INTERCOM_APP_TAG + '_auth0_last_login_at'] = intercom_data.auth0_last_login_at;
        intercom_data[env.INTERCOM_APP_TAG + '_auth0_email_verified'] = intercom_data.auth0_email_verified;

        // Additional user_metadata
        intercom_data[env.INTERCOM_APP_TAG + '_auth0_user_meta_intent_reimbursements'] = profile.user_metadata.intent_reimbursements;
        intercom_data[env.INTERCOM_APP_TAG + '_auth0_user_meta_intent_company_money_flows'] = profile.user_metadata.intent_company_money_flows;
        intercom_data[env.INTERCOM_APP_TAG + '_auth0_user_meta_intent_own_accounting_admin_work'] = profile.user_metadata.intent_own_accounting_admin_work;
        intercom_data[env.INTERCOM_APP_TAG + '_auth0_user_meta_intent_assist_others'] = profile.user_metadata.intent_assist_others;
        intercom_data[env.INTERCOM_APP_TAG + '_auth0_user_meta_intent_personal_money_flows'] = profile.user_metadata.intent_personal_money_flows;
        intercom_data[env.INTERCOM_APP_TAG + '_auth0_user_meta_intent_time_reports'] = profile.user_metadata.intent_time_reports;

        console.log('intercomUserDataFromAuth0ProfileData', intercom_data);

        return intercom_data;

    },

    /**
     * Sync metadata with intercom so that it remains somewhat up to date (only the first 10 updates per
     * page load are accepted by intercom, the rest will be synced upon page refresh)
     * @param profile
     */
    syncAuth0ProfileData: function (profile) {
        Intercom('update', this.intercomUserDataFromAuth0ProfileData(profile));
    }

};

export default IntercomUserDataHelper;
