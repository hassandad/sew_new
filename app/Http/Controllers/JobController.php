<?php

namespace App\Http\Controllers;

use App\Job;
use App\Http\Controllers\Controller;
use App\JobLookup;

class JobController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return View
     */
    public function getPostJobLookupRecords()
    {
        $jobLookup = new JobLookup();
        $assignmentType = $jobLookup->getAssignmentType();
        
        return response()->json([
            'assignmentType' => $assignmentType
        ]);
    }
}