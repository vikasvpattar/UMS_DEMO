const leave_type = [
    {
        id: "CASUAL",
        description: "Casual Leave",
        day_count: "WORKDAY",
        paid_leave: 12,
        negative_balance: 0,
        reason_required: 1,
        attachment_required: 1,
        monthly_once:1,
        status:"ACTIVE"
    },
    {
        id: "MEDICAL",
        description: "Medical Leave",
        day_count: "WORKDAY",
        paid_leave: 8,
        negative_balance: 0,
        reason_required: 1,
        attachment_required: 1,
        monthly_once:0,
        status:"ACTIVE"
    },
    {
        id: "EARNED",
        description: "Earned Leave",
        day_count: "WORKDAY",
        paid_leave: 10,
        negative_balance: 0,
        reason_required: 1,
        attachment_required: 1,
        monthly_once:0,
        status:"ACTIVE"
    },
]

const policy = [
    {
        id: "FULLDAY",
        description: "fullday sign",
        method: "WORKDAY",
        accrual_period: "start",
        earned_at:"accrual peiod"
    },
    {

    }
]


const holidays = [
    {
      name: "Makar Sankranti",
      from_date: "2022-01-14",
      to_date: "2022-01-14",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Republic Day",
      from_date: "2022-01-26",
      to_date: "2022-01-26",
      holiday_type_id: "National",
      status: "ACTIVE"
    },
    {
      name: "Maha Shivratri (Maha vad-14)",
      from_date: "2022-03-01",
      to_date: "2022-03-01",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Holi 2nd Day - Dhuleti",
      from_date: "2022-03-18",
      to_date: "2022-03-18",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Chetichand",
      from_date: "2022-04-02",
      to_date: "2022-04-02",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Shree Ram Navmi",
      from_date: "2022-04-10",
      to_date: "2022-04-10",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Dr. Baba Saheb Ambedkar's BirthdayMahavir Jamma Kalyanak",
      from_date: "2022-04-14",
      to_date: "2022-04-14",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Good Friday",
      from_date: "2022-04-15",
      to_date: "2022-04-15",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Bhagvan Shree Parshuram Jayanti",
      from_date: "2022-05-03",
      to_date: "2022-05-03",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Ramjan-Eid (Eid-Ul-Fitra) (1stshawaal) (Muslim, Shiya & Sunni)",
      from_date: "2022-05-03",
      to_date: "2022-05-03",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Bakri-Eid (Eid-Ul-Adha)",
      from_date: "2022-07-10",
      to_date: "2022-07-10",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Muharram (Ashoora)",
      from_date: "2022-08-09",
      to_date: "2022-08-09",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Raksha Banadhan",
      from_date: "2022-08-11",
      to_date: "2022-08-11",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Independence Day",
      from_date: "2022-08-15",
      to_date: "2022-08-15",
      holiday_type_id: "National",
      status: "ACTIVE"
    },
    {
      name: "Parsi New Year Day-Pateti (Parsi Shahenshahi)",
      from_date: "2022-08-16",
      to_date: "2022-08-16",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Janmashtami (Shravan Vad-8)",
      from_date: "2022-08-19",
      to_date: "2022-08-19",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Samvatsari (Chaturthi Paksha)",
      from_date: "2022-08-31",
      to_date: "2022-08-31",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Mahatma Gandhi's Birthday",
      from_date: "2022-10-02",
      to_date: "2022-10-02",
      holiday_type_id: "National",
      status: "ACTIVE"
    },
    {
      name: "Dusshera(Vijaya Dashmi) (Aaos sud-10)",
      from_date: "2022-10-05",
      to_date: "2022-10-05",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Eid-e-Meeladunnabi-(Prophet Mohammed's Birthday) (bara vafat)",
      from_date: "2022-10-09",
      to_date: "2022-10-09",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Diwali",
      from_date: "2022-10-24",
      to_date: "2022-10-24",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Vikram Samvant New year Day",
      from_date: "2022-10-26",
      to_date: "2022-10-26",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Bhai Bij",
      from_date: "2022-10-26",
      to_date: "2022-10-26",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Sardar Vallabhbhai Patel's Birthday",
      from_date: "2022-10-31",
      to_date: "2022-10-31",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Guru Nanak's Birthday",
      from_date: "2022-11-08",
      to_date: "2022-11-08",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    },
    {
      name: "Christmas",
      from_date: "2022-12-25",
      to_date: "2022-12-25",
      holiday_type_id: "Regional",
      status: "ACTIVE"
    }
  ]