<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class JobLookup extends Model
{
    protected $assignmentType = [
      1=>'Other Type',
      2=>'Case Study',
      3=>'Code',
      4=>'Lab Report',
      5=>'Math Assignment',
      6=>'Non-Word Assignment',
      7=>'Personal Statement',
      8=>'PowerPoint Presentation',
      9=>'Paraphrasing',
      10=>'Proofreading',
      11=>'Dissertation Proposal',
      12=>'Annotated Bibliography',
      13=>'Outline',
      14=>'Speech / Presentation',
      15=>'Business Plan',
      16=>'Creative Writing',
      17=>'Thesis Proposal',
      18=>'Thesis','Dissertation',
      19=>'Reports',
      20=>'Literature / Movie Review',
      21=>'Article',
      22=>'Term Paper',
      23=>'Course Work',
      24=>'Research Proposal',
      25=>'Research Paper',
      26=>'Admission / Scholarship Essay',
      27=>'Essay'
    ];
    
    public function getAssignmentType(){
      return collect($this->assignmentType);
    }
}
