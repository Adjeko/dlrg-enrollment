import { error, fail, redirect } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { updateProjectSchema } from '$lib/schema';
import { serialize } from 'object-to-formdata';

export const load = async ({ locals, params } : any) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	try {
		const project = await locals.pb.collection('projects').getOne(params.projectId)

		if (locals.user.id === project.user) {
			return {
				project
			};
		} else {
			throw error(403, 'Forbidden');
		}
	} catch (err : any) {
		console.log('Error: ', err);
		throw error(err.status, err.message);
	}
};

export const actions = {
	updateProject: async ({ request, locals, params } : any) => {
		const body = await request.formData();

		const thumb = body.get('thumbnail');

		if (thumb.size === 0) {
			body.delete('thumbnail');
		}

		const { formData, errors } = await validateData(body, updateProjectSchema);
		const { thumbnail, ...rest } = formData;

		if (errors) {
			return fail(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('projects').update(params.projectId, serialize(formData));
		} catch (err : any) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, `/my/projects`);
	},
	deleteThumbnail: async ({ locals, params } : any) => {
		try {
			await locals.pb.collection('projects').update(params.projectId, { thumbnail: null });
		} catch (err : any) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	}
};