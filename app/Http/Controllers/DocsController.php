<?php

namespace App\Http\Controllers;

use Storage;
use App\Challenge;
use App\Doc;
use App\Project;
use App\Publication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class DocsController extends Controller
{
    public function create(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'file' => 'required|max:8000|mimes:doc,docx,pdf,jpg,jpeg,png',
        ]);

        if ($validation->fails())
            return $validation->errors()->toJson();

        $file = $request->file('file');
        $name = Carbon::now()->format('YmdHis') . '_' . $file->getClientOriginalName();
        $name = preg_replace('/[[:^ascii:]]/', '', $name);
        $name = str_replace(' ', '_', $name);
        $path = auth()->id() . '/';

        Storage::disk(env('STORAGE_DISK'))->put($path . $name, file_get_contents($file));

        return Doc::create([
            'user_id' => auth()->id(),
            'name' => $name,
            'uri' => Storage::disk(env('STORAGE_DISK'))->url($path . $name)
        ]);
    }

    public function destroy(Doc $doc, Request $request)
    {
        $user = auth()->user();
        if (($user->id == $doc->user_id) || in_array($user->type, ['admin', 'super_admin'])) {
            $doc->last_editor_id = $user->id;
            $doc->save();
            return json_encode($doc->delete());
        } else {
            return abort(403, 'Unauthorized action.');
        }
    }
    public function link_publication(Doc $doc, Publication $publication, Request $request)
    {
        $user = auth()->user();

        if (($user->id == $publication->user_id) || in_array($user->type, ['admin', 'super_admin'])) {
            if (!$publication->docs->contains($doc))
                $publication->docs()->attach($doc);
            $publication = Publication::find($publication->id);
            return $publication;
        } else {
            return abort(403, 'Unauthorized action.');
        }
    }
    public function remove_link_publication(Doc $doc, Publication $publication, Request $request)
    {
        $user = auth()->user();

        if (($user->id == $publication->user_id) || in_array($user->type, ['admin', 'super_admin'])) {
            $publication->docs()->detach($doc);
            $publication = Publication::find($publication->id);
            return $publication;
        } else {
            return abort(403, 'Unauthorized action.');
        }
    }

    public function link_challenge(Doc $doc, Challenge $challenge, Request $request)
    {
        $user = auth()->user();

        if (($user->id == $challenge->user_id) || in_array($user->type, ['admin', 'super_admin'])) {
            if (!$challenge->docs->contains($doc))
                $challenge->docs()->attach($doc);
            $challenge = Challenge::find($challenge->id);
            return $challenge;
        } else {
            return abort(403, 'Unauthorized action.');
        }
    }
    public function remove_link_challenge(Doc $doc, Challenge $challenge, Request $request)
    {
        $user = auth()->user();

        if (($user->id == $challenge->user_id) || in_array($user->type, ['admin', 'super_admin'])) {
            $challenge->docs()->detach($doc);
            $challenge = Challenge::find($challenge->id);
            return $challenge;
        } else {
            return abort(403, 'Unauthorized action.');
        }
    }
    public function link_project(Doc $doc, Project $project, Request $request)
    {
        $user = auth()->user();

        if (($user->id == $project->user_id) || in_array($user->type, ['admin', 'super_admin'])) {
            if (!$project->docs->contains($doc))
                $project->docs()->attach($doc);
            $project = Project::find($project->id);
            return $project;
        } else {
            return abort(403, 'Unauthorized action.');
        }
    }
    public function remove_link_project(Doc $doc, Project $project, Request $request)
    {
        $user = auth()->user();

        if (($user->id == $project->user_id) || in_array($user->type, ['admin', 'super_admin'])) {
            $project->docs()->detach($doc);
            $project = Project::find($project->id);
            return $project;
        } else {
            return abort(403, 'Unauthorized action.');
        }
    }
}
